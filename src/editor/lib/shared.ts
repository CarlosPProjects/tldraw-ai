import { Editor, TLArrowBinding, TLBinding } from "tldraw"
import { TLInputShape } from "../schema/TLInput"

export const filterTerminals = (bindings: TLBinding[], terminalType: "start" | "end"): TLArrowBinding[] => {
  return bindings.filter((binding): binding is TLArrowBinding => {
    return binding.props && "terminal" in binding.props && binding.props.terminal === terminalType
  })
}

export const getShapesFromBindings = (bindings: TLArrowBinding[], editor: Editor): TLInputShape[] => {
  return bindings.map((binding) =>
    editor.getShape(binding.toId)
  ) as TLInputShape[]
}