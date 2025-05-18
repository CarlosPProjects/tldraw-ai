import { generateResponse } from "@/app/actions/ai/instruction";
import Tiptap from "@/components/tip-tap";
import { TLInputProps, TLInputShape } from "@/editor/schema/TLInput";
import { cn } from "@/lib/utils";
import { Lock, LockOpen, Play } from "lucide-react";
import { Geometry2d, HTMLContainer, RecordProps, Rectangle2d, resizeBox, ShapeUtil, T, TldrawUiButton, TLResizeInfo } from "tldraw";
import { getShapesFromBindings, filterTerminals } from "../../shared";

export class InputShapeUtil extends ShapeUtil<TLInputShape> {
  static override type = "input" as const;
  static override props: RecordProps<TLInputShape> = {
    w: T.number,
    h: T.number,
    text: T.string,
    name: T.string,
  }

  getDefaultProps(): TLInputProps {
    return {
      w: 300,
      h: 200,
      text: "",
      name: "Input"
    }
  }

  getGeometry(shape: TLInputShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape: TLInputShape) {

    const isLocked = this.editor.getShape(shape)?.isLocked;

    const handleLock = () => {
      this.editor.updateShape({
        id: shape.id,
        type: shape.type,
        isLocked: !shape.isLocked
      })
    }

    const handleContentUpdate = (newHtml: string) => {
      if (shape.props.text !== newHtml) {
        this.editor.updateShape({
          id: shape.id,
          type: shape.type,
          props: { text: newHtml }
        })
      }
    }

    const handleInstruction = async (shape: TLInputShape) => {
      const arrowBindings = this.editor.getBindingsInvolvingShape(shape.id, "arrow")

      const arrowShapes = arrowBindings.map(b => this.editor.getBindingsFromShape(b.fromId, "arrow"))
      const allArrowBindings = arrowShapes.flat()

      const startTerminals = filterTerminals(allArrowBindings, 'start');
      const endTerminals = filterTerminals(allArrowBindings, 'end');

      const startShapes = getShapesFromBindings(startTerminals, this.editor);
      const endShapes = getShapesFromBindings(endTerminals, this.editor);

      if (startShapes.length === 0 || endShapes.length === 0) return;

      const shapeInfo = startShapes.map(s => ({
        type: s.type,
        text: s.props.text
      }))

      const response = await generateResponse(shapeInfo)

      endShapes.forEach(endShape => {
        this.editor.updateShape({
          id: endShape.id,
          type: endShape.type,
          props: { text: response }
        })
      })
    }

    return (
      <HTMLContainer
        className={cn(`flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm`, `w-[${shape.props.w}px]`, `h-[${shape.props.h}px]`)}
      >
        <div className="flex justify-between items-center"
          style={{
            background: "linear-gradient(to right, rgba(147, 51, 234, 0.05), rgba(219, 39, 119, 0.05))",
            borderBottom: "1px solid rgba(147, 51, 234, 0.2)"
          }}
        >
          <div className="text-sm ml-2 py-1.5"
            style={{ fontFamily: 'tldraw_draw, sans-serif' }}>
            {shape.props.name}
          </div>
          <div className="flex gap-1 items-center justify-end">
            <TldrawUiButton
              type="icon"
              className="w-8 h-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={handleLock}
            >
              {isLocked ? <Lock className="w-4 h-4" /> : <LockOpen className="w-4 h-4" />}
            </TldrawUiButton>
            <TldrawUiButton
              type="icon"
              className="w-8 h-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => handleInstruction(shape)}
            >
              <Play className="w-4 h-4" />
            </TldrawUiButton>
          </div>
        </div>
        <div
          draggable={false}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          className="w-full p-2 flex-grow overflow-hidden text-sm"
        >
          <div style={{ pointerEvents: "all", cursor: "text", height: "100%" }} className="relative p-2">
            <Tiptap
              content={shape.props.text}
              onContentChange={handleContentUpdate}
              placeholder="Type your text here..."
              disabled={isLocked}
            />
          </div>
        </div>
      </HTMLContainer>
    )
  }

  indicator(shape: TLInputShape) {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        rx={4}
        ry={4}
        strokeDasharray="8 2"
        strokeWidth={1.5}
        stroke="rgba(219, 39, 119, 0.8)"
        fill="none"
      />
    )
  }

  override canBind() {
    return true;
  }
  override canEdit() {
    return true;
  }
  override canResize() {
    return true;
  }
  override isAspectRatioLocked() {
    return false;
  }
  override onResize(shape: TLInputShape, info: TLResizeInfo<TLInputShape>) {
    return resizeBox(shape, info)
  }
}