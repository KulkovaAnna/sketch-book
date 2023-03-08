import Konva from 'konva';
import { useContext } from 'react';
import ThemeContext from 'stores/ThemeStore';
import { LS_STAGE } from '../../constants/localStorage';
import { BoardController } from '../../controllers/useDrawBoardController';
import { HistoryElement, HistoryStore } from '../../stores/HistoryStore';
interface Args {
  boardController: BoardController;
  historyStore: HistoryStore;
}

export default function useEditor({ boardController, historyStore }: Args) {
  const theme = useContext(ThemeContext);

  const getLastCleanIndex = (): number =>
    (historyStore.currentHistory as any).findLastIndex(
      (p: HistoryElement) => p.type === 'clean'
    );

  const redrawFromLastClean = (noClear = false) => {
    const lastClean: number = getLastCleanIndex();
    boardController.redraw(
      historyStore.currentHistory
        .slice(lastClean === -1 ? 0 : lastClean)
        .filter((hp) => hp.type === 'drawing')
        .map((hp) => (hp as HistoryElement<'drawing'>).payload),
      noClear
    );
  };

  const redraw = (type: 'redo' | 'undo') => {
    const historyPoint =
      type === 'undo' ? historyStore.undo() : historyStore.redo();

    switch (historyPoint?.type) {
      case 'drawing':
        redrawFromLastClean();
        break;
      case 'clean':
        if (type === 'redo') boardController.clean();
        else redrawFromLastClean();
        break;
    }
  };

  const undo = redraw.bind(null, 'undo');

  const redo = redraw.bind(null, 'redo');

  const clear = () => {
    boardController.clean();
    historyStore.addHistoryPoint({ type: 'clean', payload: null });
  };

  const saveStage = (stage: Konva.Stage) => {
    const uri = stage.toDataURL();
    localStorage.setItem(LS_STAGE, uri);
  };

  const getSavedStage = () => {
    localStorage.getItem(LS_STAGE);
  };

  const exportAsImage = (stage: Konva.Stage) => {
    boardController.fillCanvas(theme.style.bacgroundColor);
    redrawFromLastClean(true);
    const uri = stage.toDataURL();
    const link = document.createElement('a');
    link.download = 'dear-diary.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    redrawFromLastClean();
  };

  return {
    undo,
    redo,
    clear,
    saveStage,
    getSavedStage,
    exportAsImage,
  };
}
