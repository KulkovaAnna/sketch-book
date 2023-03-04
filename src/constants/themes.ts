import { ThemeObject } from '../stores/ThemeStore';
import {
  COLOR_PRIMARY_LIGHT,
  COLOR_PRIMARY_DARK,
  COLOR_SECONDARY_DARK,
  COLOR_SECONDARY_LIGHT,
} from './colors';

export const lightTheme: ThemeObject = {
  iconsColor: COLOR_PRIMARY_DARK,
  bacgroundColor: COLOR_PRIMARY_LIGHT,
  fontColor: COLOR_PRIMARY_DARK,
  selectedColor: COLOR_SECONDARY_DARK,
};

export const darkTheme: ThemeObject = {
  iconsColor: COLOR_PRIMARY_LIGHT,
  bacgroundColor: COLOR_PRIMARY_DARK,
  fontColor: COLOR_PRIMARY_LIGHT,
  selectedColor: COLOR_SECONDARY_LIGHT,
};
