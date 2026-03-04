export type HexColor = string;

export interface SplashyOptions {
  quality?: number;
}

export default function splashy(buffer: Buffer): Promise<HexColor[]>;
export function toHex(rgb: [number, number, number]): HexColor;
