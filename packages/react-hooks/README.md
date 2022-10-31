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

#### Elemental Inbox

React Hooks exposes two inbox hooks, `useInbox` and `useElementalInbox`. Elemental inbox is a new inbox
that takes advantage of Courier's content specification, [Elemental](https://www.courier.com/docs/elemental/).

Elemental provides a more advanced format for delivered
notifications. This includes the ability to add customized buttons, images, and markdown formatted text
to your messages.

See [types](#1typesmd) for details on the interface.

#### Example Usage

```tsx
import { CourierProvider } from "@trycourier/react-provider";
import { useElementalInbox } from "@trycourier/react-hooks";

const MyApp = () => {
  /**
   * Auth token for courier provider, can be a token from Courier's auth/issue-token endpoint
   * or a JWT signed with a valid courier api key. Must include scope: "user_id:<user_id_here> inbox:read:messages"
   *
   * For more information on the auth/issue-token endpoint, visit:
   * https://courier.com/docs/reference/auth/intro/
   */
  const authorization = await fetchAuthToken();

  return (
    <CourierProvider authorization="abc123" userId="MY_USER_ID">
      <MyInbox />
    </CourierProvider>
  );
};

const MyInbox = () => {
  const inbox = useElementalInbox();

  useEffect(() => {
    inbox.fetchMessages();
  }, []);

  // Sets message.read to current date
  const handleReadMessage = (message) => () => {
    inbox.markMessageRead(message.messageId);
  };

  // Removes message.read
  const handleUnreadMessage = (message) => () => {
    inbox.markMessageUnread(message.messageId);
  };

  // Archived messages are not included in inbox.fetchMessages()
  const handleArchiveMessage = (message) => () => {
    inbox.markMessageArchived(message.messageId);
  };

  // If the supplied authorization token is short lived, renew the session with a fresh token
  // proactively before the token is set to expire. Here we use 5 minutes assuming our token only
  // lasts 10 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      const authorization = await fetchAuthToken();
      inbox.renewSession(authorization);
    }, 300000);

    // Return a cleanup function to tell react how to stop renewal when the component is unmounted.
    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
    </>
  );
};
```

<a name="1typesmd"></a>

### [Types](#types)

Standard Inbox (`useInbox`):

```ts
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

Elemental Inbox (`useElementalInbox`):

```ts
// This interface defines the return value of useElemental Inbox
interface IElementalInbox {
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMessagesFetched?: number;
  messages?: Array<IElementalInboxMessage>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
  /** Fetches messages from the server, sets inbox.messages to the received value */
  fetchMessages: (params?: IFetchMessagesParams) => void;
  /** Returns a count of messages that do not have a message.read date */
  getUnreadMessageCount: (params?: IGetInboxMessagesParams) => void;
  init: (inbox: IElementalInbox) => void;
  /** Marks all messages as read by setting message.read to the current ISO 8601 date */
  markAllAsRead: () => void;
  /** Archives the supplied message, archived messages are not returned by fetchMessages */
  markMessageArchived: (messageId: string) => Promise<void>;
  /** Sets message.read to the current ISO 8601 date  */
  markMessageRead: (messageId: string) => Promise<void>;
  /** Removes message.read, signalling that the message is no longer read */
  markMessageUnread: (messageId: string) => Promise<void>;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;

  /**
   * Allows for renewal of sessions authorized with short lived tokens.
   * For example, if the supplied authorization token lasts 10 minutes,
   * this function can be called with a new token every 5 minutes to ensure
   * messages are received in real time with no interruptions.
   */
  renewSession: (authorization: string) => void;
}

interface IInboxMessage {
  created?: string;
  messageId: string;
  preview?: string;
  /** ISO 8601 date the message was read */
  read?: string;
  title?: string;
}

export interface IFetchMessagesParams {
  params?: IGetInboxMessagesParams;
  after?: string;
}

export interface IGetInboxMessagesParams {
  status?: "read" | "unread";
  limit?: number;
  tags?: string[];
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

#### Manually calling events (`useInbox` Example)

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

#### Manually calling events (`useElementalInbox` Example)

You can call events manually by importing the corresponding function from the react hook.

For Example:

```js
import { CourierProvider } from "@trycourier/react-provider";
import { useElementalInbox } from "@trycourier/react-hooks";

const MyInbox = () => {
  const inbox = useElementalInbox();

  useEffect(() => {
    inbox.fetchMessages();
  }, []);

  const handleReadMessage = (message) => () => {
    inbox.markMessageRead(message.messageId);
  };

  const handleUnreadMessage = (message) => () => {
    inbox.markMessageUnread(message.messageId);
  };

  const handleArchiveMessage = (message) => () => {
    inbox.markMessageArchived(message.messageId);
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
