import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useState } from 'react';
import { Brush, LINE_WIDTH_THIN } from '../../constants/board';
import { PickerColor } from '../../constants/colors';
import { Point } from '../../controllers/Canvas';
import { BoardController } from '../../controllers/useDrawBoardController';
import { HistoryStore } from '../../stores/HistoryStore';

interface Args {
  boardController: BoardController;
  stage: Konva.Stage | null;
  historyStore: HistoryStore;
}

export default function useBoard({
  boardController,
  stage,
  historyStore,
}: Args) {
  const [brushColor, setBrushColor] = useState(PickerColor.BLACK);
  const [brushWidth, setBrushWidth] = useState(LINE_WIDTH_THIN);
  const [brush, setBrush] = useState(Brush.PEN);

  const line = useRef<Point[]>([]);

  const onStartDraw = ({ evt }: KonvaEventObject<PointerEvent>) => {
    onColorSwitch(brushColor);
    onWidthSwitch(brushWidth);
    onBrushSwitch(brush);
    const pointerPos = stage?.getPointerPosition();
    const pressure = evt.pointerType === 'pen' ? evt.pressure : 1;
    if (pointerPos) {
      const point = boardController.startDrawing(pointerPos, pressure);
      if (point) {
        line.current.push(point);
      }
    }
  };

  const onDraw = ({ evt }: KonvaEventObject<PointerEvent>) => {
    const pressure = evt.pointerType === 'pen' ? evt.pressure : 1;
    const fromPos = line.current.at(-1);
    const toPos = stage?.getPointerPosition();
    if (fromPos && toPos) {
      const endPoint = boardController.draw(fromPos, toPos, pressure);
      if (endPoint) {
        line.current.push(endPoint);
      }
    }
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
      boardController.switchWidth(10);
    } else {
      boardController.switchWidth(brushWidth);
    }
    setBrush(brush);
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
  };
}
