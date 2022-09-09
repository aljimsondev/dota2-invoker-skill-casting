import { CreateCanvas } from "../types";

export const createCanvas: CreateCanvas = (root, { height, id, width }) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.id = id;
  root.appendChild(canvas);
  return canvas;
};
