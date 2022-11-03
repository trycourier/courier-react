import { TippyProps } from "@tippyjs/react";
import { Brand, IActionBlock, ITextBlock } from "@trycourier/react-provider";
import { IHeaderProps } from "./components/Messages/Header/types";
export interface ITab {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
}

type IView = ITab;

export interface InboxProps {
  brand?: Brand;
  className?: string;
  defaultIcon?: false | string;
  from?: number;
  isOpen?: boolean;
  formatDate?: (isoDate: string) => string;
  labels?: {
    archiveMessage?: string;
    backToInbox?: string;
    emptyState?: string;
    markAllAsRead?: string;
    markAsRead?: string;
    markAsUnread?: string;
    tabs?: string[];
  };
  openLinksInNewTab?: boolean;
  placement?: TippyProps["placement"];
  showUnreadMessageCount?: boolean;
  tabs?: Array<ITab> | false;
  views?: Array<IView>;
  theme?: {
    name?: "classic" | "2.0" | undefined;
    container?: React.CSSProperties;
    footer?: React.CSSProperties;
    header?: React.CSSProperties;
    icon?: React.CSSProperties & {
      open?: string;
      closed?: string;
    };
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
  trigger?: TippyProps["trigger"];
  renderContainer?: React.FunctionComponent;
  renderTabs?: React.FunctionComponent<{
    currentTab?: ITab;
    tabs?: ITab[];
  }>;
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen: boolean;
    onClick?: (event: React.MouseEvent) => void;
  }>;
  renderBlocks?: {
    action?: React.FunctionComponent<IActionBlock>;
    text?: React.FunctionComponent<ITextBlock>;
  };
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent<IHeaderProps>;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;
}
export interface IMessage {
  unread?: number;
  messageId: string;
  created: string;
  title: string;
  body: string;
  blocks?: Array<IActionBlock | ITextBlock>;
  icon?: string;
  read?: boolean;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    archiveTrackingId: string;
    clickTrackingId: string;
    deliverTrackingId: string;
    openTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}
