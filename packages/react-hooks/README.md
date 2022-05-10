<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [Types](#types)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0overviewmd"></a>

### [Overview](#overview)

`@trycourier/react-hooks` exist as a separate package so that you can build your own interface using our api and state management without having to install all the dependencies that `@trycourier/react-inbox` or other `react-dom` based packages include.

This also enables using this package with `react-native` in a much simpler way.

<a name="1typesmd"></a>

### [Types](#types)

```
const inbox: IInbox & IInboxActions = useInbox();

interface ITab {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
}

interface IMessage {
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

interface IInboxActions {
  init: (inbox: IInbox) => void;
  toggleInbox: (isOpen?: boolean) => void;
  setView: (view: "messages" | "preferences") => void;
  setCurrentTab: (newTab: ITab) => void;
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getMessageCount: (params?: IGetMessagesParams) => void;
  markMessageRead: (messageId: string, trackingId: string) => Promise<void>;
  markMessageUnread: (messageId: string, trackingId: string) => Promise<void>;
  markAllAsRead: () => void;
}

interface IInbox {
  currentTab?: ITab;
  isLoading?: boolean;
  isOpen?: boolean;
  messages: Array<IMessage>;
  startCursor?: string;
  tabs?: ITab[];
  unreadMessageCount: number;
  view: "messages" | "preferences";
}
```
