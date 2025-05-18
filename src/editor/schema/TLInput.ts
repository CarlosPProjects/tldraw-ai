import { TLBaseShape } from "tldraw";

export interface TLInputProps {
  w: number;
  h: number;
  text: string;
  name: string;
}

export type TLInputShape = TLBaseShape<"input", TLInputProps>