import CanvasController, { Point } from './Canvas';
import { useRef } from 'react';
import { Vector2d } from 'konva/lib/types';
import { Brush, LINE_WIDTH_THIN } from '../constants/board';

export interface BoardController {
  startDrawing(point: Vector2d): Point | void;
  stopDrawing(): void;
  draw(from: Vector2d, to: Vector2d, pressure?: number): Point | void;
  redraw(path: Point[][]): void;
  clean(): void;
  switchColor(color: string): void;
  switchBrush(brush: Brush): void;
  switchWidth(width: number): void;
}
interface Args {
  canvasController: CanvasController | null;
  canvasRedraw?(): void;
}

export default function useDrawBoardController({
  canvasController,
  canvasRedraw,
}: Args): BoardController {
  const isDrawing = useRef(false);
  const brushWidth = useRef(
    canvasController?.style.lineWidth || LINE_WIDTH_THIN
  );

  const startDrawing = (point: Vector2d) => {
    isDrawing.current = true;
    const style = canvasController?.style;
    console.log(style);
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

  const draw = (from: Vector2d, to: Vector2d, pressure = 0.1) => {
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
        lineWidth: brushWidth.current * pressure * 10,
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

  const switchBrush = (brush: Brush) => {
    if (canvasController) {
      canvasController.style = {
        globalCompositeOperation: getGcoByBrushType(brush),
      };
    }
  };

  const switchWidth = (width: number) => {
    if (canvasController) {
      canvasController.style = {
        lineWidth: width,
      };
      brushWidth.current = width;
    }
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
    redraw,
    switchColor,
    switchBrush,
    switchWidth,
    clean,
  };
}

function getGcoByBrushType(brush: Brush): GlobalCompositeOperation {
  switch (brush) {
    case Brush.PEN:
      return 'source-over';
    case Brush.ERASER:
      return 'destination-out';
  }
}
