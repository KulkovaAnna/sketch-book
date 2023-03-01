import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import {
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Stage, Layer } from 'react-konva';
import CanvasController, { Point } from '../../controllers/Canvas';
import useDrawBoard from '../../controllers/useDrawBoard';
import HistoryContext, { HistoryElement } from '../../stores/HistoryStore';
import DrawBoard from '../DrawBoard';
import { Container } from './styles';

interface Props {
  style?: CSSProperties;
}

const Editor: FC<Props> = ({ style }) => {
  // eslint-disable-next-line no-restricted-globals
  const { width, height } = screen;
  const historyStore = useContext(HistoryContext);
  const layer = useRef<Konva.Layer>(null);
  const stage = useRef<Konva.Stage>(null);
  const [stateLayer, setStateLayer] = useState<Konva.Layer | null>(null);
  const line = useRef<Point[]>([]);

  useEffect(() => {
    if (layer.current) {
      setStateLayer(layer.current);
    }
  }, []);

  const canvasController = new CanvasController({
    width,
    height,
  });

  const boardController = useDrawBoard({
    canvasController,
    canvasRedraw: stateLayer?.batchDraw.bind(layer.current)!,
  });

  const onStartDraw = () => {
    const pointerPos = stage.current?.getPointerPosition();
    if (pointerPos) {
      const point = boardController.startDrawing(pointerPos);
      if (point) {
        line.current.push(point);
      }
    }
  };

  const onDraw = ({ evt }: KonvaEventObject<PointerEvent>) => {
    const fromPos = line.current.at(-1);
    const toPos = stage.current?.getPointerPosition();
    if (fromPos && toPos) {
      const endPoint = boardController.draw(fromPos, toPos, evt.pressure);
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

  const redraw = (type: 'redo' | 'undo') => {
    const historyPoint =
      type === 'undo' ? historyStore.undo() : historyStore.redo();
    switch (historyPoint?.type) {
      case 'drawing': {
        boardController.redraw(
          historyStore.currentHistory
            .filter((hp) => hp.type === 'drawing')
            .map((hp) => (hp as HistoryElement<'drawing'>).payload)
        );
      }
    }
  };

  const undo = redraw.bind(null, 'undo');

  const redo = redraw.bind(null, 'redo');

  return (
    <Container style={style}>
      <Stage
        ref={stage}
        width={width}
        height={height}
        style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}
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
};

export default Editor;
