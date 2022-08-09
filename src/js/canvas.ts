interface Canvas {
  height: number;
  width: number;
  options?: {
    id?: string;
    classList?: "string";
  };
}

class Canvas {
  #canvas: HTMLCanvasElement;
  constructor(height: number, width: number, options?: Canvas["options"]) {
    this.height = height;
    this.width = width;
    this.options = options;
    this.#canvas = document.createElement("canvas");
    this.__init();
  }

  __init() {
    const canvas = document.createElement("canvas");
    canvas.height = this.height;
    canvas.width = this.width;
    this.options?.id ? (canvas.id = this.options?.id) : null;
    this.options?.classList
      ? canvas.classList.add(this.options.classList)
      : null;
    this.#canvas = canvas;
  }
  render() {
    return this.#canvas;
  }
}
export default Canvas;
