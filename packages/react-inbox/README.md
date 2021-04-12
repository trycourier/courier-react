# Courier React Inbox

# Table of Contents

1. [Overview](#overview)
2. [Client Install](#client-install)
3. [Courier Provider](#courier-provider)
4. [Using Transport](#using-transport)
5. [Props](#props)
6. [Inbox Config](#config)

## [Overview](#overview)

## What is Courier React Inbox?

Courier React Inbox is a react component that you can add to your application show your users a list of recent messages they have received over a `push` channel.

Upcoming Features:

- Mark as `read`/`unread`
- View all `unread`

### How does @trycourier/react-inbox work?

The react inbox requires a backend to pull messages. This is all done magically through the `CourierProvider` and requires an account at [Courier](https://www.courier.com).

As of right now, we will fetch all messages sent to any `push` channel and display them in the `inbox`.

<hr>

## [Client Install](#client-install)

```js
yarn add @trycourier/react-inbox
```

<hr>

## [Courier Provider](#courier-provider)

In order for the `Toast` component to be placed in the dom you will need to use the `ToastProvider`. This will handle context and give us access to the `show` function.

> The component you want to listen to toasts from must be a child of the `ToastProvider`.
> Check [here](https://reactjs.org/docs/context.html#contextprovider) for more information on this concept.

```js
//App.js
import { Inbox, CourierProvider } from "@trycourier/react-inbox";
/*
alternatively you can access from its own package
import { CourierProvider } from "@trycourier/react-provider";
*/

function App() {
  return (
    <CourierProvider clientKey="my-client-key">
      <Inbox />
    </CourierProvider>
  );
}
```

> You can access your client key [here](https://app.courier.com/integrations/courier)

## [Using Transport](#using-transport)

To let your inbox listen for new messages, you will need to add a `transport`. Using the courier `transport` will automatically handle the listening, and invocation through web sockets

### Using the Courier Transport

```js
import {
  CourierProvider,
  CourierTransport,
  Inbox,
} from "@trycourier/react-inbox";

const courierTransport = new CourierTransport();

function MyComponent() {
  useEffect(() => {
    courierTransport.subscribe("YOUR_CHANNEL", "YOUR_EVENT");
    // It is good practice to unsubscribe on component unmount
    return () => courierTransport.unsubscribe("YOUR_CHANNEL", "YOUR_EVENT");
  }, []);

  return (
    <CourierProvider transport={courierTransport} clientKey="my-client-key">
      <Inbox />
    </CourierProvider>
  );
}
```

### [Props](#props)

| Key           | Type                | Description                               |
| ------------- | ------------------- | ----------------------------------------- |
| config        | `InboxConfig`       | See [Inbox Config](#config)               |
| title         | `string`            | Title of the Inbox                        |
| theme         | `Theme`             | Theme object used to override base styles |
| renderIcon    | `FunctionComponent` | Override Indicator Icon Component         |
| renderHeader  | `FunctionComponent` | Override Header Component                 |
| renderMessage | `FunctionComponent` | Override Message Component                |
| renderFooter  | `FunctionComponent` | Override Footer Component                 |

### [Inbox Config](#config)

| Key         | Type             | Description                               |
| ----------- | ---------------- | ----------------------------------------- |
| defaultIcon | `string | false` | Default Icon to use if no Icon is present |

### [Theme](#theme)

```
interface ITheme {
  footer?: React.CSSProperties;
  header?: React.CSSProperties;
  icon?: React.CSSProperties;
  root?: React.CSSProperties;
  messageList?: {
    container?: React.CSSProperties;
    message?: {
      actions?: {
        container?: React.CSSProperties;
        details?: React.CSSProperties;
        dismiss?: React.CSSProperties;
      }
      body?: React.CSSProperties;
      container?: React.CSSProperties;
      icon?: React.CSSProperties;
      title?: React.CSSProperties;
      unreadIndicator?: React.CSSProperties;
    }
  };
  tabList?: {
    container?: React.CSSProperties;
    tab?: React.CSSProperties;
  }
}
```
