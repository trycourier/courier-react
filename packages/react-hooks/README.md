<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [Types](#types)
- [Events](#events)

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
  id: string;
  label: string;
}

interface IMessage {
  blocks?: Array<IActionBlock | ITextBlock>;
  body: string;
  created: string;
  data?: {
    clickAction: string;
  };
  icon?: string;
  messageId: string;
  read?: boolean;
  title: string;
  trackingIds?: {
    archiveTrackingId: string;
    clickTrackingId: string;
    deliveredTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}

interface IInboxActions {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox: IInbox) => void;
  markAllAsRead: () => void;
  markMessageRead: (messageId: string, trackingId: string) => Promise<void>;
  markMessageUnread: (messageId: string, trackingId: string) => Promise<void>;
  setCurrentTab: (newTab: ITab) => void;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
}

interface IInbox {
  currentTab?: ITab;
  isLoading?: boolean;
  isOpen?: boolean;
  messages?: Array<IMessage>;
  startCursor?: string;
  tabs?: ITab[];
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
}
```

<a name="2eventsmd"></a>

### [Events](#events)

#### Inbox

Inbox supports a few different events that can be triggered on the client side.

These events are:

- Delivered
- Read
- Unread
- Click
- Archive

Some of these events are called automatically.

- Delivered events are called automatically inside the Courier Provider when a message has been delivered through the websocket
- Click events are triggered using our `click through tracking` links. Click events will also automatically trigger a `read` event.

#### Manually calling events

You can call events manually by importing the corresponding function from the react hook.

For Example:

```js
import { CourierProvider } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

const MyInbox = () => {
  const inbox = useInbox();

  useEffect(() => {
    inbox.fetchMessages();
  }, []);

  const handleReadMessage = (message) => (event) => {
    event.preventDefault();
    inbox.markMessageRead(
      message.messageId,
      message.trackingIds.readTrackingId
    );
  };

  const handleUnreadMessage = (message) => (event) => {
    event.preventDefault();
    inbox.markMessageUnread(
      message.messageId,
      message.trackingIds.unreadTrackingId
    );
  };

  const handleArchiveMessage = (message) => (event) => {
    event.preventDefault();
    inbox.markMessageArchived(
      message.messageId,
      message.trackingIds.archiveTrackingId
    );
  };

  return (
    <Container>
      {inbox.messsages.map((message) => {
        return (
          <Message>
            {message.read ? (
              <>
                <button onClick={handleUnreadMessage(message)}>
                  Unread Me
                </button>
                <button onClick={handleArchiveMessage(message)}>
                  Archive Me
                </button>
              </>
            ) : (
              <button onClick={handleReadMessage(message)}>Read Me</button>
            )}
          </Message>
        );
      })}
    </Container>
  );
};

const MyApp = () => {
  return (
    <CourierProvider userId="MY_USER_ID" clientKey="MY_CLIENT_KEY">
      <MyInbox />
    </CourierProvider>
  );
};
```
