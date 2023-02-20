import { Vector2d } from 'konva/lib/types';

interface ICanvasConstructor {
  width: number;
  height: number;
}

interface Point extends Vector2d {
  color: string;
  size: number;
}

export default class CanvasController {
  private _canvas: HTMLCanvasElement | null = null;
  private _context: CanvasRenderingContext2D | null = null;
  constructor({ width, height }: ICanvasConstructor) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = width;
    this._canvas.height = height;
    this._context = this._canvas.getContext('2d');
  }

  get canvas() {
    return this._canvas;
  }

  get context() {
    return this._context;
  }

  public drawLine(from: Vector2d, to: Vector2d) {
    if (this._context) {
      this._context.beginPath();
      this._context.moveTo(from.x, from.y);
      this._context.lineTo(to.x, to.y);
      this._context.closePath();
      this._context.stroke();
    }
  }

  public drawPath(points: Point[]) {
    if (this._context) {
      const ctx = this._context!;
      points.forEach((point, index, arr) => {
        if (index === arr.length - 1) return;
        ctx.lineWidth = point.size;
        ctx.strokeStyle = point.color;
        this.drawLine(point, arr[index + 1]);
      });
    }
  }

  public clean() {
    if (this._context && this._canvas) {
      this._context.clearRect(0, 0, this._canvas?.width, this._canvas?.height);
    }
  }
}
