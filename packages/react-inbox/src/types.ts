/* eslint-disable no-unused-vars */
import { CSSProperties } from "react";

type InboxThemeOptions = "root" | "body" | "footer" | "header"
type MessageThemeOptions = "root" | "title" | "body" | "icon" | "clickAction";
export interface IInboxConfig {
  defaultIcon?: false | string;
}

export interface InboxProps {
  className?: string;
  config?: IInboxConfig;
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent;
  renderMessage?: React.FunctionComponent;
  theme?: ThemeObject;
  title?: string;
}

type ThemeObject = {
  //https://github.com/mui-org/material-ui/blob/master/packages/material-ui-styles/src/withStyles/withStyles.d.ts#L21
  [key in InboxThemeOptions | MessageThemeOptions | string ]?: CSSProperties | ThemeObject;
}
