import { TippyProps } from "@tippyjs/react";
import { Brand, IActionBlock, ITextBlock } from "@trycourier/react-provider";

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
  from?: number;
  isOpen?: boolean;
  placement?: TippyProps["placement"];
  renderContainer?: React.FunctionComponent;
  renderTabs?: React.FunctionComponent<{
    currentTab?: ITab;
    tabs?: ITab[];
  }>;
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
  }>;
  renderBlocks?: {
    action?: React.FunctionComponent<IActionBlock>;
    text?: React.FunctionComponent<ITextBlock>;
  };
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent<{
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;
  showUnreadMessageCount?: boolean;
  tabs?: Array<ITab>;
  theme?: {
    container?: React.CSSProperties;
    footer?: React.CSSProperties;
    header?: React.CSSProperties;
    icon?: React.CSSProperties;
    messageList?: {
      container?: React.CSSProperties;
    };
    message?: {
      actions?: {
        container?: React.CSSProperties;
        details?: React.CSSProperties;
        dismiss?: React.CSSProperties;
      };
      body?: React.CSSProperties;
      container?: React.CSSProperties;
      icon?: React.CSSProperties;
      title?: React.CSSProperties;
      unreadIndicator?: React.CSSProperties;
    };
    tabList?: {
      container?: React.CSSProperties;
      tab?: React.CSSProperties;
    };
    root?: React.CSSProperties;
    unreadIndicator?: React.CSSProperties;
  };
  title?: string;
  labels?: {
    markAsRead?: string;
    markAsUnread?: string;
    markAllAsRead?: string;
    backToInbox?: string;
  };
  trigger?: TippyProps["trigger"];
}

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
