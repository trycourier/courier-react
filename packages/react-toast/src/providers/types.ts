import {
  CSSProperties, MouseEventHandler,
} from "react";
import { ToastPosition } from "react-toastify";
import { ToastCaller } from "../hooks/types";
import { Transport } from "../transports";

export interface ToastProviderProps {
  clientKey: string;
  config?: IProviderConfig;
  transport?: Transport
}

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

export interface IProviderConfig {
  autoClose?: boolean | number;
  defaultIcon?: string | false;
  hideProgressBar?: boolean;
  onClick?: MouseEventHandler<Element>;
  position?: ToastPosition;
  role?: string;
  theme?: Theme;
  transition?: string;
}

export interface IToastContext {
  clientKey: string;
  config: IProviderConfig;
  toast: ToastCaller;
}
