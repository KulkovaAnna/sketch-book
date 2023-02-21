import { Image } from 'react-konva';
import React, { FC, useEffect } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { BoardController } from '../../controllers/useDrawBoard';

interface Props {
  boardController: BoardController;
  canvas: HTMLCanvasElement;
}

const DrawBoard: FC<Props> = ({ boardController, canvas }) => {
  const handlePointerMove = (e: KonvaEventObject<PointerEvent>) => {
    boardController.draw(e.evt.pressure);
  };

  useEffect(() => {
    const undoRedoListener = (ev: KeyboardEvent) => {
      if (ev.code === 'KeyZ') {
        if (ev.ctrlKey || ev.metaKey) {
          if (ev.shiftKey) {
            boardController.redo();
          } else {
            boardController.undo();
          }
        }
      }
    };
    document.addEventListener('keydown', undoRedoListener);
    return () => {
      document.removeEventListener('keydown', undoRedoListener);
    };
  }, [boardController]);

  return (
    <Image
      image={canvas}
      x={0}
      y={0}
      onMouseDown={boardController.startDrawing}
      onTouchStart={boardController.startDrawing}
      onMouseUp={boardController.stopDrawing}
      onTouchEnd={boardController.stopDrawing}
      onMouseLeave={boardController.stopDrawing}
      onPointerMove={handlePointerMove}
    />
  );
};

export default DrawBoard;
