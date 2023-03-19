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
import Toolbox from '../Toolbox';
import { Container, ToolboxContainer } from './styles';
import useBoard from './useBoard';
import useEditor from './useEditor';

interface Props {
  style?: CSSProperties;
}

// eslint-disable-next-line no-restricted-globals
const { width, height } = screen;
const canvasController = new CanvasController({
  width,
  height,
});

const Editor: FC<Props> = observer(({ style }) => {
  const historyStore = useContext(HistoryContext);
  const layer = useRef<Konva.Layer>(null);
  const stage = useRef<Konva.Stage>(null);
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
  } = useBoard({
    boardController,
    historyStore,
    stage: stage.current,
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

  return (
    <Container style={style} theme={theme.style}>
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
    </Container>
  );
});

export default Editor;
