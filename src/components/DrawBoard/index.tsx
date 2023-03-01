import { Image } from 'react-konva';
import React, { FC } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

interface Props {
  canvas: HTMLCanvasElement;
  onStartDraw?(): void;
  onDraw?(evt: KonvaEventObject<PointerEvent>): void;
  onStopDraw?(): void;
}

const DrawBoard: FC<Props> = ({ onDraw, onStartDraw, onStopDraw, canvas }) => {
  const onMouseDown = ({ evt }: KonvaEventObject<MouseEvent>) => {
    if (evt.button === 0) {
      onStartDraw?.();
    }
  };
  return (
    <Image
      image={canvas}
      x={0}
      y={0}
      onMouseDown={onMouseDown}
      onTouchStart={onStartDraw}
      onMouseUp={onStopDraw}
      onTouchEnd={onStopDraw}
      onMouseLeave={onStopDraw}
      onPointerMove={onDraw}
    />
  );
};

export default DrawBoard;
