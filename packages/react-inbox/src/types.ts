/* eslint-disable no-unused-vars */
import { CSSProperties } from "react";
import { TippyProps } from "@tippyjs/react";
import { Brand, IActionBlock, ITextBlock } from "@trycourier/react-provider";

type InboxThemeOptions = "root" | "body" | "footer" | "header";
type MessageThemeOptions = "root" | "title" | "body" | "icon" | "clickAction";

export interface ITab {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
}
export interface InboxProps {
  brand?: Brand;
  className?: string;
  defaultIcon?: false | string;
  isOpen?: boolean;
  placement?: TippyProps["placement"];
  renderContainer?: React.FunctionComponent;
  renderTabs?: React.FunctionComponent<{
    currentTab?: ITab;
    tabs?: ITab[];
  }>;
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent<{
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;
  tabs?: Array<ITab>;
  theme?: ThemeObject;
  title?: string;
  trigger?: TippyProps["trigger"];
}

type ThemeObject = {
  //https://github.com/mui-org/material-ui/blob/master/packages/material-ui-styles/src/withStyles/withStyles.d.ts#L21
  [key in InboxThemeOptions | MessageThemeOptions | string]?:
    | CSSProperties
    | ThemeObject;
};

export interface IMessage {
  unread?: number;
  messageId: string;
  created: number;
  title: string;
  body: string;
  blocks?: Array<IActionBlock | ITextBlock>;
  icon?: string;
  read?: boolean;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    clickTrackingId: string;
    deliveredTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}
