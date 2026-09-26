import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
  useRef,
  useState,
} from 'react';
import { Brush, EraserWidth, LineWidth } from 'constants/editor';
import { PickerColor } from 'constants/editor';
import { Point } from 'controllers/CanvasController';
import { BoardController } from 'controllers/useDrawBoardController';
import { HistoryStore } from 'stores/HistoryStore';

interface Args {
  boardController: BoardController;
  stage: Konva.Stage | null;
  containerRef: RefObject<HTMLDivElement | null>;
  historyStore: HistoryStore;
}

export interface EraserCursor {
  x: number;
  y: number;
  radius: number;
}

const getPressure = (evt: PointerEvent) =>
  evt.pointerType === 'pen' ? Math.max(evt.pressure, 0) : 1;

export default function useBoard({
  boardController,
  stage,
  containerRef,
  historyStore,
}: Args) {
  const [brushColor, setBrushColor] = useState(PickerColor.BLACK);
  const [brushWidth, setBrushWidth] = useState(LineWidth.THIN);
  const [brush, setBrush] = useState(Brush.PEN);
  const [eraserCursor, setEraserCursor] = useState<EraserCursor | null>(null);

  const line = useRef<Point[]>([]);
  const lastPressure = useRef(1);

  const onStartDraw = ({ evt }: KonvaEventObject<PointerEvent>) => {
    onColorSwitch(brushColor);
    onWidthSwitch(brushWidth);
    onBrushSwitch(brush);
    const pointerPos = stage?.getPointerPosition();
    const pressure = evt.pointerType === 'pen' ? evt.pressure : 1;
    lastPressure.current = pressure;
    if (pointerPos) {
      const point = boardController.startDrawing(pointerPos, pressure);
      if (point) {
        line.current.push(point);
      }
    }
  };

  const onDraw = ({ evt }: KonvaEventObject<PointerEvent>) => {
    const pressure = evt.pointerType === 'pen' ? evt.pressure : 1;
    lastPressure.current = pressure;
    const fromPos = line.current.at(-1);
    const toPos = stage?.getPointerPosition();
    if (fromPos && toPos) {
      const endPoint = boardController.draw(fromPos, toPos, pressure);
      if (endPoint) {
        line.current.push(endPoint);
      }
    }
  };

  const updateEraserCursor = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    const isEraser = brush === Brush.ERASER;
    if (!container || !isEraser) {
      if (eraserCursor !== null) setEraserCursor(null);
      return;
    }
    const rect = container.getBoundingClientRect();
    const radius =
      (EraserWidth * (lastPressure.current || 1)) / 2 + 1 /* border width */;
    setEraserCursor({
      x: clientX - rect.left,
      y: clientY - rect.top,
      radius,
    });
  };

  const handleContainerMouseMove = (ev: ReactMouseEvent<HTMLDivElement>) => {
    updateEraserCursor(ev.clientX, ev.clientY);
  };

  const handleContainerPointerMove = (
    ev: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (ev.pointerType === 'pen') {
      lastPressure.current = getPressure(ev.nativeEvent);
    }
    updateEraserCursor(ev.clientX, ev.clientY);
  };

  const handleContainerMouseLeave = () => {
    setEraserCursor(null);
  };

  const onStopDraw = () => {
    boardController.stopDrawing();
    if (line.current.length > 0) {
      historyStore.addHistoryPoint({
        type: 'drawing',
        payload: line.current,
      });
      line.current = [];
    }
  };

  const onColorSwitch = (color: PickerColor) => {
    setBrushColor(color);
    boardController.switchColor(color);
  };

  const onWidthSwitch = (width: number) => {
    setBrushWidth(width);
    boardController.switchWidth(width);
  };

  const onBrushSwitch = (brush: Brush) => {
    if (brush === Brush.ERASER) {
      boardController.switchWidth(EraserWidth);
    } else {
      boardController.switchWidth(brushWidth);
    }
    setBrush(brush);
    if (brush !== Brush.ERASER) {
      setEraserCursor(null);
    }
    boardController.switchBrush(brush);
  };

  return {
    onStartDraw,
    onDraw,
    onStopDraw,
    onColorSwitch,
    brushColor,
    brushWidth,
    onWidthSwitch,
    brush,
    onBrushSwitch,
    eraserCursor,
    handleContainerMouseMove,
    handleContainerPointerMove,
    handleContainerMouseLeave,
  };
}
