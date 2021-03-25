/* eslint-disable no-unused-vars */
import { CSSProperties } from "react";
import { TippyProps } from "@tippyjs/react";

type InboxThemeOptions = "root" | "body" | "footer" | "header"
type MessageThemeOptions = "root" | "title" | "body" | "icon" | "clickAction";
export interface IInboxConfig {
  defaultIcon?: false | string;
}

export interface InboxProps {
  className?: string;
  config?: IInboxConfig;
  placement?: TippyProps["placement"];
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent<{
    hasUnreadMessages: boolean;
  }>;
  renderMessage?: React.FunctionComponent;
  theme?: ThemeObject;
  title?: string;
  trigger?: TippyProps["trigger"];
  unreadCount?: string;
}

type ThemeObject = {
  //https://github.com/mui-org/material-ui/blob/master/packages/material-ui-styles/src/withStyles/withStyles.d.ts#L21
  [key in InboxThemeOptions | MessageThemeOptions | string]?: CSSProperties | ThemeObject;
}
