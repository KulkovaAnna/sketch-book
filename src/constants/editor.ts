export enum LineWidth {
  THIN = 2,
  NORMAL = 4,
  BOLD = 6,
}

export enum Brush {
  PEN = 'pen',
  ERASER = 'eraser',
}

// Базовая толщина ластика (в пикселях).
// При рисовании пером реальная толщина стирания варьируется в зависимости
// от силы нажатия: EraserWidth * pressure.
export const EraserWidth = 20;

export enum PickerColor {
  BLACK = '#000000',
  RED = '#cd3c3c',
  GREEN = '#7bc847',
  BLUE = '#3652da',
  YELLOW = '#e6d747',
  PURPLE = '#bc5cf2',
}
