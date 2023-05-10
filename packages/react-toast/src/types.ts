import { ToastPosition } from "react-toastify";
import { Brand, IInboxMessagePreview } from "@trycourier/react-provider";
import { CSSObject } from "styled-components";

export type Theme = {
  body?: CSSObject;
  root?: CSSObject;
  toast?: CSSObject;
  dismiss?: CSSObject;
  message?: {
    clickableContainer?: CSSObject;
    container?: CSSObject;
    contents?: CSSObject;
    icon?: CSSObject;
    textElement?: CSSObject;
    title?: CSSObject;
  };
  progressBar?: CSSObject;
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
