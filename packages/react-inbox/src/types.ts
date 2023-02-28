import { TippyProps } from "@tippyjs/react";
import { Brand, IInboxMessagePreview } from "@trycourier/react-provider";

import { IHeaderProps } from "./components/Messages2.0/types";

type IView = {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
};

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
    closeInbox?: string;
    emptyState?: string;
    markAllAsRead?: string;
    markAsRead?: string;
    markAsUnread?: string;
  };
  openLinksInNewTab?: boolean;
  placement?: TippyProps["placement"];
  showUnreadMessageCount?: boolean;
  views?: Array<IView>;
  theme?: {
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
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen: boolean;
    onClick?: (event: React.MouseEvent) => void;
  }>;
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent<IHeaderProps>;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IInboxMessagePreview>;
  renderNoMessages?: React.FunctionComponent;
}
