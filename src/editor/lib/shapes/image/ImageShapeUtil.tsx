import { TLImageShape } from "@/editor/schema/TLImage";
import { Geometry2d, HTMLContainer, RecordProps, Rectangle2d, resizeBox, ShapeUtil, T, TldrawUiButton, TLResizeInfo } from "tldraw";
import { getShapesFromBindings } from "../../shared";
import { filterTerminals } from "../../shared";
import { generateAIImage } from "@/app/actions/ai/image";
import { cn } from "@/lib/utils";
import { Lock, LockOpen } from "lucide-react";
import { WandIcon } from "lucide-react";

export class ImageShapeUtil extends ShapeUtil<TLImageShape> {
  static override type = "image" as const
  static override props: RecordProps<TLImageShape> = {
    w: T.number,
    h: T.number,
    prompt: T.string,
    imageUrl: T.string,
    name: T.string,
  }

  getDefaultProps(): TLImageShape["props"] {
    return {
      w: 300,
      h: 300,
      prompt: "",
      imageUrl: "",
      name: "Image",
    }
  }

  getGeometry(shape: TLImageShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  indicator(shape: TLImageShape) {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        rx={4}
        ry={4}
        strokeDasharray="8 2"
        strokeWidth={1.5}
        stroke="rgba(59, 130, 246, 0.8)"
        fill="none"
      />
    )
  }

  component(shape: TLImageShape) {
    const isLocked = this.editor.getShape(shape)?.isLocked

    const handleLock = (shape: TLImageShape) => {
      this.editor.updateShape({
        id: shape.id,
        type: shape.type,
        isLocked: !shape.isLocked,
      })
    }

    const handleGenerateImage = async () => {
      const arrowBindings = this.editor.getBindingsInvolvingShape(shape.id, "arrow")

      const arrowShapes = arrowBindings.map(b => this.editor.getBindingsFromShape(b.fromId, "arrow"));
      const allArrowBindings = arrowShapes.flat();

      const startTerminals = filterTerminals(allArrowBindings, 'start');
      const endTerminals = filterTerminals(allArrowBindings, 'end');

      const startShapes = getShapesFromBindings(startTerminals, this.editor);
      const endShapes = getShapesFromBindings(endTerminals, this.editor);

      if (startShapes.length === 0 || endShapes.length === 0) return;

      const shapeInfos = startShapes.map(s => ({
        type: s.type,
        text: s.props.text
      }));

      const prompt = shapeInfos.map(s => s.text).join("\n");

      this.editor.updateShape({
        id: shape.id,
        type: shape.type,
        props: { ...shape.props, prompt }
      })

      const result = await generateAIImage(prompt)

      if (result.success && result.imageData) {
        const imageUrl = `data:${result.mimeType};base64,${result.imageData}`;

        this.editor.updateShape({
          id: shape.id,
          type: shape.type,
          props: {
            ...shape.props,
            imageUrl
          },
        });
      }
    }

    return (
      <HTMLContainer
        className={cn("flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm", `w-[${shape.props.w}px]`, `h-[${shape.props.h}px]`)}
      >
        <div className="flex justify-between items-center z-10"
          style={{
            background: "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
            borderBottom: "1px solid rgba(59, 130, 246, 0.2)"
          }}>
          <div className="text-sm ml-2 py-1.5" style={{ fontFamily: 'tldraw_draw, sans-serif' }}>
            {shape.props.name}
          </div>
          <div className="flex gap-1 items-center justify-end">
            <TldrawUiButton
              type="icon"
              className="h-8 w-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleGenerateImage();
              }}
            >
              <WandIcon className="h-4 w-4" />
            </TldrawUiButton>
            <TldrawUiButton
              type="icon"
              className="h-8 w-8 p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleLock(shape);
              }}
            >
              {isLocked
                ? <Lock className="h-4 w-4" />
                : <LockOpen className="h-4 w-4" />}
            </TldrawUiButton>
          </div>
        </div>
        <div className="flex-grow relative">
          {shape.props.imageUrl ? (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${shape.props.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ) : (
            <div className="w-full h-full bg-transparent"></div>
          )}
        </div>
      </HTMLContainer>
    )
  }


  override canBind() {
    return true
  }
  override canEdit() {
    return true
  }
  override canResize() {
    return true
  }
  override isAspectRatioLocked() {
    return false
  }
  override onResize(shape: TLImageShape, info: TLResizeInfo<TLImageShape>) {
    return resizeBox(shape, info)
  }
}