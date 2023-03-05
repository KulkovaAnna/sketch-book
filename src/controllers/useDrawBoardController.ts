import CanvasController, { Point } from './CanvasController';
import { useRef } from 'react';
import { Vector2d } from 'konva/lib/types';
import { Brush, LINE_WIDTH_THIN } from 'constants/board';

export interface BoardController {
  startDrawing(point: Vector2d, pressure?: number): Point | void;
  stopDrawing(): void;
  draw(from: Vector2d, to: Vector2d, pressure?: number): Point | void;
  redraw(path: Point[][], noClear?: boolean): void;
  clean(): void;
  switchColor(color: string): void;
  switchBrush(brush: Brush): void;
  switchWidth(width: number): void;
  fillCanvas(color: string): void;
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

  const startDrawing = (point: Vector2d, pressure = 1) => {
    isDrawing.current = true;
    const style = canvasController?.style;
    if (style) {
      const lastPointerPosition = {
        ...point,
        ...style,
        lineWidth: style.lineWidth * pressure,
      };
      canvasController?.drawPoint(lastPointerPosition);
      canvasRedraw?.();
      return lastPointerPosition;
    }
  };

  const draw = (from: Vector2d, to: Vector2d, pressure = 1) => {
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
        lineWidth: brushWidth.current * pressure,
      };
      canvasController?.drawLine(localPos, point);
      canvasRedraw?.();
      return point;
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const redraw = (path: Point[][], noClear = false) => {
    if (!noClear) canvasController?.clean();
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

  const fillCanvas = (color: string) => {
    canvasController?.fill(color);
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
    fillCanvas,
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
