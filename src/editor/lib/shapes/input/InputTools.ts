import { TLInputShape } from "@/editor/schema/TLInput";
import { createShapeId, StateNode, TLEventHandlers } from "tldraw";

class InputIdleState extends StateNode {
  static override id = "idle"

  override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
    this.parent.transition('pointing', info)
  }
}

class InputPointingState extends StateNode {
  static override id = 'pointing'

  override onPointerUp: TLEventHandlers['onPointerUp'] = () => {
    const { editor } = this
    const { currentPagePoint } = editor.inputs

    const id = createShapeId()
    editor.createShape<TLInputShape>({
      id,
      type: 'input',
      x: currentPagePoint.x - 150,
      y: currentPagePoint.y - 100,
      props: {
        w: 300,
        h: 200,
        text: "",
        name: "Input"
      },
    })

    editor.select(id)

    editor.setCurrentTool("select")
  }

  override onCancel: TLEventHandlers['onCancel'] = () => {
    this.parent.transition('idle')
  }
}

export class InputTool extends StateNode {
  static override id = 'input'
  static override initial = 'idle'
  static override children = () => [InputIdleState, InputPointingState]

  override onEnter = () => {
    const { editor } = this
    editor.setCursor({ type: 'cross' })
  }

  override onExit = () => {
    const { editor } = this
    editor.setCursor({ type: 'default' })
  }
}