import CanvasController, { Point } from './Canvas';
import Konva from 'konva';
import { useRef } from 'react';

export type Brush = 'pen' | 'eraser';

export interface BoardController {
  startDrawing(): void;
  stopDrawing(): void;
  draw(pressure?: number): void;
  undo(): void;
  redo(): void;
  clean(): void;
  switchColor(color: string): void;
  switchBrush(brush: Brush): void;
}
interface Args {
  canvasController: CanvasController | null;
  stage?: Konva.Stage | null;
  layer?: Konva.Layer | null;
}

export default function useDrawBoard({
  canvasController,
  stage,
  layer,
}: Args): BoardController {
  const isDrawing = useRef(false);
  const lastPointerPosition = useRef<Point | null>(null);
  const history = useRef<Point[][]>([]);
  const currentHistoryIndex = useRef<number>(-1);
  const startDrawing = () => {
    isDrawing.current = true;
    const style = canvasController?.style;
    const pos = stage?.getPointerPosition() || null;
    if (style && pos) {
      lastPointerPosition.current = {
        ...pos,
        ...style,
      };
      canvasController?.drawPoint(lastPointerPosition.current);
      layer?.batchDraw();
      currentHistoryIndex.current++;
      history.current.splice(
        currentHistoryIndex.current,
        history.current.length,
        [lastPointerPosition.current]
      );
    }
  };

  const draw = (pressure = 0.5) => {
    if (!isDrawing.current) {
      return;
    }
    if (lastPointerPosition.current && stage) {
      const style = canvasController?.style;
      let localPos = lastPointerPosition.current;
      const coordinates = stage.getPointerPosition();
      if (coordinates && style) {
        const point: Point = {
          ...coordinates,
          ...style,
          lineWidth: pressure * 10,
        };
        canvasController?.drawLine(localPos, point);
        lastPointerPosition.current = point;
        history.current[history.current.length - 1].push(point);
        layer?.batchDraw();
      }
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const undo = () => {
    if (currentHistoryIndex.current < 0) return;
    canvasController?.clean();
    history.current
      .slice(0, currentHistoryIndex.current)
      .forEach((pointArr) => canvasController?.drawPath(pointArr));
    currentHistoryIndex.current--;
    layer?.batchDraw();
  };

  const redo = () => {
    if (currentHistoryIndex.current >= history.current.length - 1) return;
    canvasController?.clean();
    currentHistoryIndex.current++;
    history.current
      .slice(0, currentHistoryIndex.current + 1)
      .forEach((pointArr) => canvasController?.drawPath(pointArr));
    layer?.batchDraw();
  };

  const clean = () => {
    canvasController?.clean();
    history.current = [];
    currentHistoryIndex.current = -1;
    layer?.batchDraw();
  };

  const switchColor = (color: string) => {
    canvasController!.style = { strokeStyle: color };
  };

  const switchBrush = (brush: 'pen' | 'eraser') => {
    canvasController!.style = {
      globalCompositeOperation: getGcoByBrushType(brush),
    };
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
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
