import React, { useEffect, useRef, useState } from 'react';
import { DrawBoard } from './components';
import { Container } from './App.styles';
import { Layer, Stage } from 'react-konva';
import CanvasController from './controllers/Canvas';
import useDrawBoard, { Brush } from './controllers/useDrawBoard';
import Konva from 'konva';
const stageSize = {
  width: 500,
  height: 500,
};
function App() {
  const stage = useRef<Konva.Stage>(null);
  const layer = useRef<Konva.Layer>(null);
  const container = useRef<HTMLDivElement>(null);
  const [canvasController, setCanvasController] =
    useState<CanvasController | null>(null);

  const boardController = useDrawBoard({
    canvasController,
    stage: stage.current,
    layer: layer.current,
  });
  const handleColorPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    boardController.switchColor(e.target.value);
  };

  const onBrushChange: React.ReactEventHandler<HTMLSelectElement> = (e) => {
    boardController.switchBrush((e.target as HTMLSelectElement).value as Brush);
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
      setCanvasController(canvas);
    }
  }, []);

  return (
    <Container ref={container}>
      <div style={{ display: 'flex', position: 'absolute', zIndex: 999 }}>
        <button onClick={boardController.clean}>Clear</button>
        <button onClick={boardController.undo}>Undo</button>
        <button onClick={boardController.redo}>Redo</button>
        <input type="color" onChange={handleColorPick} />
        <select onChange={onBrushChange}>
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
      </div>

      <Stage ref={stage} width={stageSize.width} height={stageSize.height}>
        <Layer ref={layer}>
          <DrawBoard
            boardController={boardController}
            canvas={canvasController?.canvas!}
          />
        </Layer>
      </Stage>
    </Container>
  );
}

export default App;
