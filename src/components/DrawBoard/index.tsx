import { Image } from 'react-konva';
import React, { FC } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

interface Props {
  canvas: HTMLCanvasElement;
  onStartDraw?(evt: KonvaEventObject<PointerEvent>): void;
  onDraw?(evt: KonvaEventObject<PointerEvent>): void;
  onStopDraw?(): void;
}

const DrawBoard: FC<Props> = ({ onDraw, onStartDraw, onStopDraw, canvas }) => {
  const onMouseDown = (ev: KonvaEventObject<PointerEvent>) => {
    if (ev.evt.button === 0) {
      onStartDraw?.(ev);
    }
  };
  return (
    <Image
      image={canvas}
      x={0}
      y={0}
      onPointerDown={onMouseDown}
      onMouseUp={onStopDraw}
      onTouchEnd={onStopDraw}
      onMouseLeave={onStopDraw}
      onPointerMove={onDraw}
      alt="Drawing board"
    />
  );
};

export default DrawBoard;
