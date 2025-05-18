import { TLBaseShape } from "tldraw";

export interface TLImageProps {
  w: number,
  h: number,
  prompt: string,
  imageUrl: string,
  name: string,
}

export type TLImageShape = TLBaseShape<"image", TLImageProps>