import { TippyProps } from "@tippyjs/react";
import { OnEvent } from "@trycourier/react-provider";
import { IGetInboxMessagesParams } from "@trycourier/client-graphql";

import { IHeaderProps } from "./components/Messages2.0/types";
import { CSSObject } from "styled-components";
import { Brand, IInboxMessagePreview, PinDetails } from "@trycourier/core";
import { MarkdownToJSX } from "markdown-to-jsx";

export interface InboxTheme {
  brand?: Brand;
  colorMode?: "light" | "dark";
  variables?: {
    background: string;
  };
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
    scrollTop?: CSSObject;
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
  brand?: Brand;
  className?: string;
  defaultIcon?: false | string;
  from?: number;
  isOpen?: boolean;
  markdownOptions?: MarkdownToJSX.Options;
  tenantId?: string;
  views?: Array<{
    id: string;
    label: string;
    params?: IGetInboxMessagesParams;
  }>;
  formatDate?: (isoDate: string) => string;
  appendTo?: string;
  labels?: {
    archiveMessage?: string;
    backToInbox?: string;
    closeInbox?: string;
    emptyState?: string;
    markAllAsRead?: string;
    markAsRead?: string;
    markAsUnread?: string;
    scrollTop?: string | ((count: string) => string);
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
