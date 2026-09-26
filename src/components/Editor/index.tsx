import Konva from 'konva';
import { observer } from 'mobx-react-lite';
import {
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Stage, Layer } from 'react-konva';
import CanvasController from 'controllers/CanvasController';
import useDrawBoardController from 'controllers/useDrawBoardController';
import HistoryContext from 'stores/HistoryStore';
import ThemeContext from 'stores/ThemeStore';
import DrawBoard from '../DrawBoard';
import EraserIndicator from '../EraserIndicator';
import Toolbox from '../Toolbox';
import { Brush } from 'constants/editor';
import { Container, ToolboxContainer } from './styles';
import useBoard from './useBoard';
import useEditor from './useEditor';

interface Props {
  style?: CSSProperties;
}

const { width, height } = screen;
const canvasController = new CanvasController({
  width,
  height,
});

const Editor: FC<Props> = observer(({ style }) => {
  const historyStore = useContext(HistoryContext);
  const layer = useRef<Konva.Layer>(null);
  const stage = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stateLayer, setStateLayer] = useState<Konva.Layer | null>(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (layer.current) {
      setStateLayer(layer.current);
    }
  }, []);

  const boardController = useDrawBoardController({
    canvasController,
    canvasRedraw: stateLayer?.batchDraw.bind(layer.current),
  });

  const {
    onDraw,
    onStartDraw,
    onStopDraw,
    onColorSwitch: switchColor,
    brushColor,
    brushWidth,
    onWidthSwitch,
    brush,
    onBrushSwitch,
    eraserCursor,
    handleContainerMouseMove,
    handleContainerPointerMove,
    handleContainerMouseLeave,
  } = useBoard({
    boardController,
    historyStore,
    stage: stage.current,
    containerRef,
  });

  const { undo, redo, clear, exportAsImage } = useEditor({
    boardController,
    historyStore,
  });

  const onDownloadClick = () => {
    if (stage.current) exportAsImage(stage.current);
  };

  useEffect(() => {
    const keyListener = (ev: KeyboardEvent) => {
      if (ev.code === 'KeyZ') {
        if (ev.ctrlKey) {
          if (ev.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
      }
    };
    window.addEventListener('keydown', keyListener);
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [redo, undo]);

  const isEraserSelected = brush === Brush.ERASER;

  return (
    <Container
      ref={containerRef}
      style={{ ...style, ...(isEraserSelected ? { cursor: 'none' } : null) }}
      theme={theme.style}
      onMouseMove={handleContainerMouseMove}
      onPointerMove={handleContainerPointerMove}
      onMouseLeave={handleContainerMouseLeave}
    >
      <ToolboxContainer theme={theme.style}>
        <Toolbox onBinClick={clear} onDownloadClick={onDownloadClick}>
          <Toolbox.RedrawControls
            key="redraw"
            onRedoClick={redo}
            onUndoClick={undo}
          />
          <Toolbox.ColorPicker
            key="color-picker"
            selectedColor={brushColor}
            onColorSelect={switchColor}
          />
          <Toolbox.LineWidthPicker
            key="line-width-picker"
            selectedWidth={brushWidth}
            onWidthSelect={onWidthSwitch}
          />
          <Toolbox.BrushPicker
            key="brush-picker"
            selectedBrush={brush}
            onBrushSelect={onBrushSwitch}
          />
          <Toolbox.MediaFilePicker key="media-picker" />
        </Toolbox>
      </ToolboxContainer>
      <Stage
        ref={stage}
        width={width}
        height={height}
        style={{
          backgroundColor: theme.style.bacgroundColor,
        }}
      >
        <Layer ref={layer}>
          <DrawBoard
            onStopDraw={onStopDraw}
            onStartDraw={onStartDraw}
            onDraw={onDraw}
            canvas={canvasController.canvas}
          />
        </Layer>
      </Stage>
      {isEraserSelected && eraserCursor && (
        <EraserIndicator
          x={eraserCursor.x}
          y={eraserCursor.y}
          radius={eraserCursor.radius}
        />
      )}
    </Container>
  );
});

export default Editor;
