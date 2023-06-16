<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [3.X Breaking Changes](#3x-breaking-changes)
  - [Message Interface](#message-interface)
  - [Events](#events)
- [Types](#types)
- [Events](#events-1)
  - [Manually calling events (`useInbox` Example)](#manually-calling-events-useinbox-example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0overviewmd"></a>

## [Overview](#overview)

`@trycourier/react-hooks` exist as a separate package so that you can build your own interface using our api and state management without having to install all the dependencies that `@trycourier/react-inbox` or other `react-dom` based packages include.

This also enables using this package with `react-native` in a much simpler way.

## [3.X Breaking Changes](#3x-breaking-changes)

As of 3.X we have started to use a new API for our inbox messages. The interface is slightly different which means interacting with the `useInbox` hook will need to be updated to match the new interface.

### Message Interface

```ts
interface ActionBlock {
  type: "text";
  text: string;
  url: string;
}

interface OldMessage {
  title: string;
  body: string;
  read?: boolean;
  blocks: Array<TextBlock | ActionBlock>;
}

interface ActionElement {
  type: "text";
  content: string;
  href: string;
}

interface NewMessage {
  title: string;
  preview: string;
  read?: string;
  actions: Array<ActionElement>;
}
```

This means if you were consuming `const { messages } = useInbox` that the array of messages will now be different and will need to be updated.

### Events

The old versions had events like `markRead(messageId, trackingId)`. The new version no longer requires passing a trackingId to track events.

- 1.X/2.X Old Interface:

```ts
interface IInboxActions {
  markMessageArchived: (
    messageId: string,
    trackingId?: string
  ) => Promise<void>;
  markMessageRead: (messageId: string, trackingId?: string) => Promise<void>;
  markMessageUnread: (messageId: string, trackingId?: string) => Promise<void>;
  markMessageOpened: (messageId: string, trackingId: string) => Promise<void>;
}
```

- 3.X Interface:

```ts
interface IInboxActions {
  markMessageArchived: (messageId: string) => Promise<void>;
  markMessageRead: (messageId: string) => Promise<void>;
  markMessageUnread: (messageId: string) => Promise<void>;
  markMessageOpened: (messageId: string) => Promise<void>;
}
```

<a name="1typesmd"></a>

## [Types](#types)

Standard Inbox (`useInbox`):

```ts
const inbox: IInbox & IInboxActions = useInbox();

interface ActionElement {
  type: "text";
  content: string;
  href: string;
}

interface IInboxMessagePreview {
  actions?: IActionElemental[];
  archived?: string;
  created: string;
  data?: Record<string, any>;
  messageId: string;
  opened?: string;
  preview?: string;
  read?: string;
  tags?: string[];
  title?: string;
}

interface IInboxActions {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox: IInbox) => void;
  markAllAsRead: (fromWS?: boolean) => void;
  markMessageArchived: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageOpened: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageRead: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageUnread: (messageId: string, fromWS?: boolean) => Promise<void>;
  newMessage: (transportMessage: IInboxMessagePreview) => void;
  resetLastFetched: () => void;
  setView: (view: string | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
}

interface IInbox {
  isLoading?: boolean;
  isOpen?: boolean;
  messages?: Array<IInboxMessagePreview>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: string | "preferences";
}
```

<a name="2eventsmd"></a>

## [Events](#events)

Inbox supports a few different events that can be triggered on the client side.

These events are:

- Opened
- Read
- Unread
- Click
- Archive
- Unpin

Some of these events are called automatically.

- Delivered events are called automatically inside the Courier Provider when a message has been delivered through the websocket
- Click events are triggered using our `click through tracking` links. Click events will also automatically trigger a `read` event.

### Manually calling events (`useInbox` Example)

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
    inbox.markMessageRead(message.messageId);

    if (message.pinned) {
      inbox.unpinMessage(message.messageId);
    }
  };

  const handleUnreadMessage = (message) => (event) => {
    event.preventDefault();
    inbox.markMessageUnread(message.messageId);
  };

  const handleArchiveMessage = (message) => (event) => {
    event.preventDefault();
    inbox.markMessageArchived(message.messageId);
  };

  const handleArchiveMessage = (message) => (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      {inbox.messages.map((message) => {
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
