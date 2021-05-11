import { ToastPosition } from "react-toastify";
import { Brand } from "@trycourier/react-provider";

export type Theme = {
  body?: React.CSSProperties;
  root?: React.CSSProperties;
  toast?: React.CSSProperties;
  message?: {
    actions: {
      container?: React.CSSProperties;
      details?: React.CSSProperties;
      dismiss?: React.CSSProperties;
    };
    body?: React.CSSProperties;
    contents?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
  };
  progressBar?: React.CSSProperties;
};

export interface IToastConfig {
  autoClose?: false | number;
  brand?: Brand;
  defaultIcon?: string | false;
  hideProgressBar?: boolean;
  onClick?: React.MouseEventHandler<Element>;
  position?: ToastPosition;
  role?: string;
  theme?: Theme;
  transition?: string;
}
