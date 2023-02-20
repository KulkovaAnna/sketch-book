import { Container } from './styles';
import * as Konva from 'konva';
import { Stage, Image, Layer } from 'react-konva';
import React, { useEffect, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import CanvasController from './Canvas';

const stageSize = {
  width: 500,
  height: 500,
};

interface HistoryPoint extends Vector2d {
  color: string;
  size: number;
}

const DrawBoard = () => {
  const isDrawing = useRef(false);
  const lastPointerPosition = useRef<Vector2d | null>(null);
  const history = useRef<HistoryPoint[][]>([]);
  const currentHistoryIndex = useRef<number>(-1);

  const stage = useRef<Konva.default.Stage>(null);
  const layer = useRef<Konva.default.Layer>(null);
  const container = useRef<HTMLDivElement>(null);

  const [canvasController, setCanvasController] =
    useState<CanvasController | null>(null);

  const handletouchStart = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    isDrawing.current = true;
    const ctx = canvasController?.context;
    const pos = e.target.getStage()?.getPointerPosition() || null;
    if (ctx && pos) {
      lastPointerPosition.current = pos;
      currentHistoryIndex.current++;
      history.current.splice(
        currentHistoryIndex.current,
        history.current.length,
        [{ ...pos, color: ctx.strokeStyle as string, size: ctx.lineWidth }]
      );
    }
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  const handlePointerMove = (e: KonvaEventObject<PointerEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    if (lastPointerPosition.current && stage) {
      let localPos = {
        x: lastPointerPosition.current.x,
        y: lastPointerPosition.current.y,
      };
      const pos = stage.getPointerPosition();
      const ctx = canvasController?.context;
      if (pos && ctx) {
        ctx.lineWidth = e.evt.pressure * 10;
        canvasController?.drawLine(localPos, pos);
        lastPointerPosition.current = pos;
        history.current[history.current.length - 1].push({
          ...pos,
          color: ctx.strokeStyle as string,
          size: ctx.lineWidth,
        });
        layer.current?.batchDraw();
      }
    }
  };

  const handleCleanClick = () => {
    canvasController?.clean();
    history.current = [];
    currentHistoryIndex.current = -1;
    layer.current?.batchDraw();
  };

  const handleWindowResize = () => {
    if (container.current && stage.current && canvasController?.canvas) {
      const containerWidth = container.current.offsetWidth;
      const containerHeight = container.current.offsetHeight;
      stage.current.width(containerWidth);
      stage.current.height(containerHeight);
      canvasController.canvas.width = containerWidth;
      canvasController.canvas.height = containerWidth;
      setCanvasController(canvasController);
    }
  };

  const handleUndoClick = React.useCallback(() => {
    if (currentHistoryIndex.current < 0) {
      return;
    }
    canvasController?.clean();
    history.current
      .slice(0, currentHistoryIndex.current)
      .forEach((pointArr) => {
        canvasController?.drawPath(pointArr);
      });
    currentHistoryIndex.current--;
    layer.current?.batchDraw();
  }, [canvasController]);

  const handleRedoClick = React.useCallback(() => {
    if (currentHistoryIndex.current >= history.current.length - 1) return;
    canvasController?.clean();
    currentHistoryIndex.current++;
    history.current
      .slice(0, currentHistoryIndex.current + 1)
      .forEach((pointArr) => {
        canvasController?.drawPath(pointArr);
      });
    layer.current?.batchDraw();
  }, [canvasController]);

  const handleColorPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (canvasController?.context) {
      canvasController.context.strokeStyle = e.target.value;
    }
  };

  useEffect(() => {
    if (stage.current && container.current) {
      const containerWidth = container.current.offsetWidth;
      const containerHeight = container.current.offsetHeight;
      stage.current.width(containerWidth);
      stage.current.height(containerHeight);
      const canvas = new CanvasController({
        width: containerWidth,
        height: containerHeight,
      });

      const context = canvas.context;
      if (context) {
        context.lineWidth = 5;
        context.lineJoin = 'round';
      }
      setCanvasController(canvas);
    }
  }, []);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code === 'KeyZ') {
        if (ev.ctrlKey || ev.metaKey) {
          if (ev.shiftKey) {
            handleRedoClick();
          } else {
            handleUndoClick();
          }
        }
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handleRedoClick, handleUndoClick]);

  return (
    <Container ref={container} onResize={handleWindowResize}>
      <div style={{ display: 'flex', position: 'absolute', zIndex: 999 }}>
        <button onClick={handleCleanClick}>Clear</button>
        <button onClick={handleUndoClick}>Undo</button>
        <button onClick={handleRedoClick}>Redo</button>
        <input type="color" onChange={handleColorPick} />
      </div>

      <Stage ref={stage} width={stageSize.width} height={stageSize.height}>
        <Layer ref={layer}>
          <Image
            image={canvasController?.canvas || undefined}
            x={0}
            y={0}
            onMouseDown={handletouchStart}
            onTouchStart={handletouchStart}
            onMouseUp={handleTouchEnd}
            onTouchEnd={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            globalCompositeOperation="source-over"
            onPointerMove={handlePointerMove}
          />
        </Layer>
      </Stage>
    </Container>
  );
};

export default DrawBoard;
