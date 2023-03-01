import CanvasController, { Point } from './Canvas';
import { useRef } from 'react';
import { Vector2d } from 'konva/lib/types';

export type Brush = 'pen' | 'eraser';

export interface BoardController {
  startDrawing(point: Vector2d): Point | void;
  stopDrawing(): void;
  draw(from: Vector2d, to: Vector2d, pressure?: number): Point | void;
  redraw(path: Point[][]): void;
  clean(): void;
  switchColor(color: string): void;
  switchBrush(brush: Brush): void;
}
interface Args {
  canvasController: CanvasController | null;
  canvasRedraw?(): void;
}

export default function useDrawBoard({
  canvasController,
  canvasRedraw,
}: Args): BoardController {
  const isDrawing = useRef(false);

  const startDrawing = (point: Vector2d) => {
    isDrawing.current = true;
    const style = canvasController?.style;
    if (style) {
      const lastPointerPosition = {
        ...point,
        ...style,
      };
      canvasController?.drawPoint(lastPointerPosition);
      canvasRedraw?.();
      return lastPointerPosition;
    }
  };

  const draw = (from: Vector2d, to: Vector2d, pressure = 0.5) => {
    if (!isDrawing.current) {
      return;
    }
    if (canvasController) {
      const style = canvasController?.style;
      let localPos: Point = {
        ...style,
        ...from,
      };
      const point: Point = {
        ...to,
        ...style,
        lineWidth: pressure * 10,
      };
      canvasController?.drawLine(localPos, point);
      canvasRedraw?.();
      return point;
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const redraw = (path: Point[][]) => {
    canvasController?.clean();
    path.forEach((point) => canvasController?.drawPath(point));
    canvasRedraw?.();
  };

  const clean = () => {
    canvasController?.clean();
    canvasRedraw?.();
  };

  const switchColor = (color: string) => {
    if (canvasController) {
      canvasController.style = { strokeStyle: color };
    }
  };

  const switchBrush = (brush: 'pen' | 'eraser') => {
    if (canvasController) {
      canvasController.style = {
        globalCompositeOperation: getGcoByBrushType(brush),
      };
    }
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
    redraw,
    switchColor,
    switchBrush,
    clean,
  };
}

function getGcoByBrushType(brush: Brush): GlobalCompositeOperation {
  switch (brush) {
    case 'pen':
      return 'source-over';
    case 'eraser':
      return 'destination-out';
  }
}
