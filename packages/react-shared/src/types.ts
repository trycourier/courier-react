import { CSSObject } from "styled-components";

export interface Theme {
  brand?: {
    colors: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
    };
  };
  container?: CSSObject;
  emptyState?: CSSObject;
  footer?: CSSObject;
  header?: CSSObject;
  icon?: CSSObject;
  messageList?: {
    container?: CSSObject;
  };
  message?: {
    actions?: {
      container?: CSSObject;
      details?: CSSObject;
      dismiss?: CSSObject;
    };
    body?: CSSObject;
    container?: CSSObject;
    icon?: CSSObject;
    title?: CSSObject;
    unreadIndicator?: CSSObject;
  };
  tabList?: {
    container?: CSSObject;
    tab?: CSSObject;
  };
  root?: CSSObject;
}

export interface ThemedOpts {
  theme?: Theme;
}
