/* eslint-disable no-unused-vars */
import { CSSProperties } from "react";

type InboxThemeOptions = "root" | "title" | "body" | "footer" | "header" | "close" | "subTitle" | "message";
type MessageThemeOptions = "root" | "read" | "title" | "container" | "body" | "icon";

export interface InboxProps {
  messages: Message[];
  title?: string;
  onClose?: (event: React.MouseEvent) => void;
  onMessageClick?: (Message) => void;
  indicator?: boolean;
  show?: boolean;
  closeOnClickOut?: boolean;
  theme?: ThemeObject;
}
interface Message {
  title: string;
  body: string;
  icon?: string;
  id?: string | number;
  read?: boolean;
}

type ThemeObject = {
  //https://github.com/mui-org/material-ui/blob/master/packages/material-ui-styles/src/withStyles/withStyles.d.ts#L21
  [key in InboxThemeOptions | MessageThemeOptions | string ]?: CSSProperties | ThemeObject;
}
