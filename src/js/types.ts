type CreateCanvasOptions = {
  id: string;
  width: number;
  height: number;
};

export type CreateCanvas = (
  root: Element,
  options: CreateCanvasOptions
) => HTMLCanvasElement;
