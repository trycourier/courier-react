import {
  CSSProperties, MouseEventHandler,
} from "react";
import { ToastPosition } from "react-toastify";

type ThemeKey = CSSProperties | {[key: string]: CSSProperties};

export type Theme = Partial<{
  root: ThemeKey;
  toast: ThemeKey;
  body: ThemeKey;
  sidebar: Partial<{
    dismiss: ThemeKey;
    details: ThemeKey;
  }> & ThemeKey;
  title: ThemeKey;
  content: ThemeKey;
  icon: ThemeKey;
  progressBar: ThemeKey;
}>;

export interface IToastConfig {
  autoClose?: false | number;
  defaultIcon?: string | false;
  hideProgressBar?: boolean;
  onClick?: MouseEventHandler<Element>;
  position?: ToastPosition;
  role?: string;
  theme?: Theme;
  transition?: string;
}
