import { BoardController } from '../../controllers/useDrawBoardController';
import { HistoryElement, HistoryStore } from '../../stores/HistoryStore';

interface Args {
  boardController: BoardController;
  historyStore: HistoryStore;
}

export default function useEditor({ boardController, historyStore }: Args) {
  const redraw = (type: 'redo' | 'undo') => {
    const historyPoint =
      type === 'undo' ? historyStore.undo() : historyStore.redo();
    const lastClean: number = (
      historyStore.currentHistory as any
    ).findLastIndex((p: HistoryElement) => p.type === 'clean');
    const fullRedraw = () => {
      boardController.redraw(
        historyStore.currentHistory
          .slice(lastClean === -1 ? 0 : lastClean)
          .filter((hp) => hp.type === 'drawing')
          .map((hp) => (hp as HistoryElement<'drawing'>).payload)
      );
    };
    switch (historyPoint?.type) {
      case 'drawing':
        fullRedraw();
        break;
      case 'clean':
        if (type === 'redo') boardController.clean();
        else fullRedraw();
        break;
    }
  };

  const undo = redraw.bind(null, 'undo');

  const redo = redraw.bind(null, 'redo');

  const clear = () => {
    boardController.clean();
    historyStore.addHistoryPoint({ type: 'clean', payload: null });
  };

  return {
    undo,
    redo,
    clear,
  };
}
