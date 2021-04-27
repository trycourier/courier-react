# Courier React Inbox

# Table of Contents

1. [Overview](#overview)
2. [Client Install](#client-install)
3. [Courier Provider](#courier-provider)
4. [Using Transport](#using-transport)
5. [Props](#props)
6. [Inbox Config](#config)

## [Overview](#overview)

## What is Inbox?

Inbox is a react component that you can add to your application show your users a list of recent messages they have received over a `push` channel.

Upcoming Features:

- Browser Web Push
- Presence

### How does @trycourier/react-inbox work?

The react inbox requires a backend to pull messages. This is all done through the `CourierProvider` and requires an account at [Courier](https://www.courier.com). To set up Courier Inbox you will need to install Courier from the integrations page. [Courier Push integration](https://app.courier.com/integrations/courier)
After installing the integration you will be provided with a Client Key

<img src="https://user-images.githubusercontent.com/16184018/109491559-8f8ee600-7a3e-11eb-9aa4-742639274fde.png" />

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
    <CourierProvider userId={yourUserId} clientKey={yourClientKey}>
      <Inbox />
    </CourierProvider>
  );
}
```

## [Using Transport](#using-transport)

To let your inbox listen for new messages, you will need to add a `transport`. Using the courier `transport` will automatically handle the listening, and invocation through web sockets.

In order to display messages for a specific user you will also need to supply the recipientId as the userId to the CourierProvider. All messages sent through Courier have a recipientId and you can see that in the [Data](https://app.courier.com/data/messages) tab or from the request you are sending.

> Check out this for more information on [recipients](https://help.courier.com/en/articles/4397413-how-to-send-a-notification#3-the-recipient-id)

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
  };
  root?: React.CSSProperties;
}
```
