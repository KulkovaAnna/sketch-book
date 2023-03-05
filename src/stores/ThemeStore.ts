import { darkTheme, lightTheme } from 'constants/themes';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { LS_THEME } from 'constants/localStorage';

export type Theme = 'light' | 'dark';

export interface ThemeObject {
  iconsColor: string;
  bacgroundColor: string;
  fontColor: string;
  selectedColor: string;
}

export class ThemeStore {
  curentTheme: Theme = 'light';
  constructor() {
    this.curentTheme = (localStorage.getItem(LS_THEME) as Theme) || 'light';
    makeAutoObservable(this);
  }

  get style(): ThemeObject {
    return this.curentTheme === 'dark' ? darkTheme : lightTheme;
  }

  switchTheme(theme?: Theme) {
    if (theme) {
      this.curentTheme = theme;
    } else {
      this.curentTheme = this.curentTheme === 'dark' ? 'light' : 'dark';
    }
  }
}

const ThemeContext = createContext<ThemeStore>(new ThemeStore());

export default ThemeContext;
