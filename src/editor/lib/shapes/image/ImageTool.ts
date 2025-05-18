import { createShapeId, TLEventHandlers } from "tldraw"
import { TLImageShape } from "@/editor/schema/TLImage"
import { StateNode } from "tldraw"

class ImageIdleState extends StateNode {
  static override id = 'idle'

  override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
    this.parent.transition('pointing', info)
  }
}

class ImagePointingState extends StateNode {
  static override id = 'pointing'

  override onPointerUp: TLEventHandlers['onPointerUp'] = () => {
    const { editor } = this
    const { currentPagePoint } = editor.inputs

    const id = createShapeId()
    editor.createShape<TLImageShape>({
      id,
      type: 'image',
      x: currentPagePoint.x - 150,
      y: currentPagePoint.y - 150,
      props: {
        w: 300,
        h: 300,
        prompt: '',
        imageUrl: '',
        name: 'Image',
      },
    })

    editor.select(id)

    editor.setCurrentTool('select')
  }

  override onCancel: TLEventHandlers['onCancel'] = () => {
    this.parent.transition('idle')
  }
}

export class ImageTool extends StateNode {
  static override id = 'image'
  static override initial = 'idle'
  static override children = () => [ImageIdleState, ImagePointingState]

  override onEnter = () => {
    const { editor } = this
    editor.setCursor({ type: 'cross' })
  }

  override onExit = () => {
    const { editor } = this
    editor.setCursor({ type: 'default' })
  }
} 