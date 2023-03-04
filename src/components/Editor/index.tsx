import Konva from 'konva';
import { observer } from 'mobx-react-lite';
import {
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Stage, Layer } from 'react-konva';
import CanvasController from '../../controllers/Canvas';
import useDrawBoardController from '../../controllers/useDrawBoardController';
import HistoryContext from '../../stores/HistoryStore';
import ThemeContext from '../../stores/ThemeStore';
import DrawBoard from '../DrawBoard';
import Toolbox from '../Toolbox';
import { Container, ToolboxContainer } from './styles';
import useBoard from './useBoard';
import useEditor from './useEditor';

interface Props {
  style?: CSSProperties;
}

const Editor: FC<Props> = observer(({ style }) => {
  // eslint-disable-next-line no-restricted-globals
  const { width, height } = screen;
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

  const canvasController = useMemo(
    () =>
      new CanvasController({
        width,
        height,
      }),
    [height, width]
  );

  const boardController = useDrawBoardController({
    canvasController,
    canvasRedraw: stateLayer?.batchDraw.bind(layer.current)!,
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

  const { undo, redo, clear } = useEditor({ boardController, historyStore });

  useEffect(() => {
    const keyListener = (ev: KeyboardEvent) => {
      if (ev.code === 'KeyZ') {
        if (ev.ctrlKey) {
          if (ev.shiftKey) {
            console.log('redo');
            redo();
          } else {
            console.log('undo');
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
        <Toolbox
          onClearClick={clear}
          onRedoClick={redo}
          onUndoClick={undo}
          onColorSelect={switchColor}
          selectedColor={brushColor}
          selectedLineWidth={brushWidth}
          onLineWidthSelect={onWidthSwitch}
          selectedBrush={brush}
          onBrushSelect={onBrushSwitch}
        />
      </ToolboxContainer>
      <Stage
        ref={stage}
        width={width}
        height={height}
        style={{
          backgroundColor: theme.style.bacgroundColor,
          overflow: 'hidden',
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
