import { ToastPosition } from "react-toastify";
import { Brand, IInboxMessagePreview } from "@trycourier/react-provider";

export type Theme = {
  body?: React.CSSProperties;
  root?: React.CSSProperties;
  toast?: React.CSSProperties;
  dismiss?: React.CSSProperties;
  message?: {
    textBlock?: React.CSSProperties;
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
  openLinksInNewTab?: boolean;
  position?: ToastPosition;
  role?: string;
  theme?: Theme;
  transition?: string;
  renderMessage?: React.FunctionComponent<IInboxMessagePreview>;
}
