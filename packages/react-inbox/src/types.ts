import { TippyProps } from "@tippyjs/react";
import {
  Brand,
  PinDetails,
  IInboxMessagePreview,
  OnEvent,
} from "@trycourier/react-provider";
import { IGetInboxMessagesParams } from "@trycourier/client-graphql";

import { IHeaderProps } from "./components/Messages2.0/types";
import { CSSObject } from "styled-components";

export interface InboxTheme {
  brand?: Brand;
  container?: CSSObject;
  emptyState?: CSSObject;
  footer?: CSSObject;
  header?: CSSObject;
  menu?: CSSObject;
  tooltip?: CSSObject;
  icon?: CSSObject & {
    open?: string;
    closed?: string;
  };
  messageList?: {
    container?: CSSObject;
  };
  message?: {
    actionElement?: CSSObject;
    clickableContainer?: CSSObject;
    container?: CSSObject;
    content?: CSSObject;
    icon?: CSSObject;
    textElement?: CSSObject;
    timeAgo?: CSSObject;
    title?: CSSObject;
    unreadIndicator?: CSSObject;
  };
  root?: CSSObject;
  unreadIndicator?: CSSObject;
}

export interface InboxProps {
  accountId?: string;
  brand?: Brand;
  className?: string;
  defaultIcon?: false | string;
  from?: number;
  isOpen?: boolean;
  views?: Array<{
    id: string;
    label: string;
    params?: IGetInboxMessagesParams;
  }>;
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
  onEvent?: OnEvent;
  openLinksInNewTab?: boolean;
  placement?: TippyProps["placement"];
  showUnreadMessageCount?: boolean;
  theme?: InboxTheme;
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
  renderPin?: React.FunctionComponent<PinDetails>;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IInboxMessagePreview>;
  renderNoMessages?: React.FunctionComponent;
}
