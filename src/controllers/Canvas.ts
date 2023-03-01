import { Vector2d } from 'konva/lib/types';

interface ICanvasConstructor {
  width: number;
  height: number;
}

interface CanvasStyle {
  strokeStyle?: string;
  lineWidth?: number;
  globalCompositeOperation?: GlobalCompositeOperation;
}

export type Point = Vector2d & Required<CanvasStyle>;

export default class CanvasController {
  private _canvas: HTMLCanvasElement | null = null;
  private _context: CanvasRenderingContext2D | null = null;
  constructor({ width, height }: ICanvasConstructor) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = width;
    this._canvas.height = height;
    this._context = this._canvas.getContext('2d');
    this.context.lineWidth = 5;
    this.context.lineJoin = 'round';
  }

  get canvas() {
    return this._canvas!;
  }

  private get context() {
    return this._context!;
  }

  drawPoint(point: Point) {
    const { x, y, strokeStyle, ...rest } = point;
    this.context.fillStyle = strokeStyle;
    this.style = rest;
    this.context.beginPath();
    this.context.ellipse(
      x,
      y,
      point.lineWidth / 2,
      point.lineWidth / 2,
      Math.PI / 4,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  drawLine(from: Point, to: Point) {
    const { x: toX, y: toY, ...toStyle } = to;
    this.style = toStyle;
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(toX, toY);
    this.context.closePath();
    this.context.stroke();
  }

  drawPath(points: Point[]) {
    if (points.length === 1) {
      const point = points[0];
      if (point) return this.drawPoint(point);
    }
    points.forEach((point, index, arr) => {
      if (index === arr.length - 1) return;
      this.drawLine(point, arr[index + 1]);
    });
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  set style(style: CanvasStyle) {
    Object.entries(style).forEach((item) => {
      const field = item[0] as keyof Omit<CanvasRenderingContext2D, 'canvas'>;
      const value = item[1] as never;
      this.context[field] = value;
    });
  }

  get style(): Required<CanvasStyle> {
    return {
      strokeStyle: this.context.strokeStyle as string,
      lineWidth: this.context.lineWidth,
      globalCompositeOperation: this.context.globalCompositeOperation,
    };
  }
}
