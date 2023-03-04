import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { Point } from '../controllers/Canvas';

type ActionType = 'drawing' | 'addShape' | 'clean';

export type HistoryDrawingPayload = Point[];

export interface HistoryElement<T = ActionType> {
  type: T;
  payload: T extends 'drawing'
    ? HistoryDrawingPayload
    : T extends 'clean'
    ? null
    : {};
}

type History = HistoryElement[];

export class HistoryStore {
  fullHistory: History = [];
  historyPosition: number = -1;

  constructor(defaultHistory: History = []) {
    this.fullHistory = defaultHistory;
    makeAutoObservable(this, {}, { proxy: false });
  }

  get currentHistory() {
    if (this.historyPosition > -1)
      return this.fullHistory.slice(0, this.historyPosition + 1);
    else return [];
  }

  addHistoryPoint(point: HistoryElement) {
    this.historyPosition++;
    this.fullHistory.splice(
      this.historyPosition,
      this.fullHistory.length,
      point
    );
  }

  redo() {
    if (this.historyPosition >= this.fullHistory.length - 1) return;
    this.historyPosition++;
    return this.fullHistory[this.historyPosition];
  }

  undo() {
    if (this.historyPosition < 0) return;
    this.historyPosition--;
    return this.fullHistory[this.historyPosition + 1];
  }
}

const HistoryContext = createContext<HistoryStore>(new HistoryStore());

export default HistoryContext;
