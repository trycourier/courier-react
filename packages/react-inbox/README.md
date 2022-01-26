<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is Inbox?](#what-is-inbox)
  - [How does @trycourier/react-inbox work?](#how-does-trycourierreact-inbox-work)
- [Client Install](#client-install)
- [Courier Provider](#courier-provider)
  - [Props](#props)
  - [Theme](#theme)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="1overviewmd"></a>

## What is Inbox?

Inbox is a react component that you can add to your application show your users a list of recent messages they have received over a `push` channel.

Upcoming Features:

- Browser Web Push
- Presence

### How does @trycourier/react-inbox work?

The react inbox requires a backend to pull messages. This is all done through the `CourierProvider` and requires an account at [Courier](https://www.courier.com). To set up Courier Inbox you will need to install Courier from the integrations page. [Courier Push integration](https://app.courier.com/integrations/courier)
After installing the integration you will be provided with a Client Key

![image](https://user-images.githubusercontent.com/16184018/109491559-8f8ee600-7a3e-11eb-9aa4-742639274fde.png)

As of right now, we will fetch all messages sent to any `push` channel and display them in the `inbox`.

<a name="2installationmd"></a>

## [Client Install](#client-install)

```js
yarn add @trycourier/react-inbox
```

## [Courier Provider](#courier-provider)

In order for the `Inbox` component to be placed in the dom you will need to use the `CourierProvider`. This will handle context and give us access Courier's backend API.

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

<a name="3propsmd"></a>

### [Props](#props)

```
interface InboxProps = {
  //Brand Override
  brand?: Brand;

  //Icon Class Name
  className?: string;

  // Default Icon to use if no Icon is present in Message
  defaultIcon?: false | string;

  // Placement of the Bell relative to the Inbox
  placement?: "top" | "left" | "right" | "bottom";

  // Render Props for Custom Rendering
  renderBell?: React.FunctionComponent;
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent<{
    hasUnreadMessages: boolean;
  }>;
  renderMessage?: React.FunctionComponent;

  // Tab Overrides
  tabs?: Array<ITab>;
  theme?: ThemeObject;

  // Inbox Title Override
  title?: string;
  trigger?: "click" | "hover";
}
```

### [Theme](#theme)

```
interface ITheme {
  footer?: React.CSSProperties;
  header?: React.CSSProperties;
  icon?: React.CSSProperties;
  container?: React.CSSProperties;
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
