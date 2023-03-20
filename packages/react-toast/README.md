<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is Toast?](#what-is-toast)
- [How does it work?](#how-does-it-work)
- [3.X Breaking Changes](#3x-breaking-changes)
  - [Message Interface](#message-interface)
  - [[2.X]](#2x)
  - [Theme](#theme)
- [Client Install](#client-install)
- [Courier Integration](#courier-integration)
- [Client Setup](#client-setup)
- [Using Courier's API](#using-couriers-api)
- [Props](#props)
- [Theme](#theme-1)
- [Using Hook](#using-hook)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="1overviewmd"></a>

## [What is Toast?](#what-is-toast)

Toast aims to be the easiest way to create in-app notifications. With a simple integration and straight forward API we make it easy for anyone to integrate fast.

Toast is a buzz word for a notification that happens in-app and slides in or pops up. The appearance is usually that of a rectangle in the top right of an application.

## [How does it work?](#how-does-it-work)

There are two ways to use this library:

1. With Courier as a transport provider
2. A standalone toast interface

You can use the [Courier Push integration](https://app.courier.com/integrations/courier) to create a notification through the designer and send a notification to a specific channel/event from an API request. This will trigger the toast to show wherever the client is running and listening for that same channel/event.

A channel/event combination is simply a stream on which a particular client is listening for toast notifications. A client must be subscribed to a channel and event in order to receive a notification.

## [3.X Breaking Changes](#3x-breaking-changes)

We've implemented a new API which has a little bit different format for the messages that come through the websocket and this in turn means some of the function calls and hooks have a different API.

### Message Interface

The format of the message has changd, so if you have any code that utilizes any of the following you will need to update:

1. Interacting with `useToast`
2. Intercepting messages with Courier Provider prop onMessage
3. Implemented `renderMessage` or `renderAction`

This is a contrived example of the changes:

> Note we are utilized our new [elemental](https://www.courier.com/docs/elemental/elements/) standard:

```ts
interface OldMessage {
  title: string;
  body: string;
  blocks: Array<TextBlock | ActionBlock>;
}

interface NewMessage {
  title: string;
  preview: string;
  actions: Array<ActionElement>;
}
```

The new toast component also does _not_ show any buttons. The actual toast is clickable and will highlight a background color to let users know it has a link associated with it.

### [2.X]

You can revert and use the 2.X releases to prevent having the above breaking changes. You will need both `@trycourier/react-toast` and `@trycourier/react-provider` to be on the same 2.X version.

### [Theme](#theme)

- theme.message.actionBlock -> deprecated
  - the entire message is now clickable
- theme.message.textBlock -> theme.message.textElement
- `theme.message.clickableContainer`: when a message has an action href, we now make the entire message clickable instead of rendering an explicit button. this theme property allows access to this component. `theme.message.container` will still apply to this component but if you want to target the clickableContainer separatly you can target `theme.message.clickableContainer` which will be an `anchor` element instead of a `div`;

<a name="2installationmd"></a>

## [Client Install](#client-install)

```js
yarn add @trycourier/react-toast
```

## [Courier Integration](#courier-integration)

We will need to install the [Courier Push Integration](https://app.courier.com/integrations/courier) to trigger a toast from an API request.
Make sure to copy the Client Key from the integration page after installing.

![image](https://user-images.githubusercontent.com/16184018/109491559-8f8ee600-7a3e-11eb-9aa4-742639274fde.png)

## [Client Setup](#client-setup)

Now that you have a notification ready to be sent lets setup the client to listen for the notification and invoke it when triggered. Pass your userId and clientKey into your CourierProvider and we will handle all of the network connections

```js
import { CourierProvider } from "@trycourier/react-provider";
import { Toast } from "@trycourier/react-toast";

const App: React.FunctionComponent = () => {
  return (
    <CourierProvider userId={USER_ID} clientKey={CLIENT_KEY}>
      <Toast />
    </CourierProvider>
  );
};
```

## Using Courier's API

Now that we have the Courier Provider installed and we have our React application listening to messages, we can trigger a send to the Courier API.

```js
import { CourierClient } from "@trycourier/courier";

const courier = CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

await courier.send({
  message: {
    to: {
      user_id: "USER_ID",
    },
    content: {
      title: "Hello World",
      body: "{{foo}}",
    },
    data: {
      foo: "bar",
    },
  },
});
```

If you want to use the [template designer](https://app.courier.com/designer) an api call would instead look like the following:

```js
import { CourierClient } from "@trycourier/courier";

const courier = CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

await courier.send({
  message: {
    to: {
      user_id: "USER_ID",
    },
    template: "TEMPLATE_ID",
    data: {
      foo: "bar",
    },
  },
});
```

<a name="3propsmd"></a>

## [Props](#props)

```
interface ToastProps {
  // Number in ms for Toast to auto close
  // Set as `false` to disable auto close

  autoClose?: false | number;

  // Default icon if no icon is present in message
  defaultIcon?: string | false;

  // Hide the progress bar
  hideProgressBar?: boolean;
  onClick?: MouseEventHandler<Element>;

  // Toast positioning when triggered
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
  role?: "alert" | "status";
  theme?: Theme;

  // Animation when the Toast is displayed
  transition?: "bounce" | "slide" | "zoom";
}
```

<a name="4thememd"></a>

## [Theme](#theme)

```
interface ITheme {
  body?: React.CSSProperties;
  root?: React.CSSProperties;
  toast?: React.CSSProperties;
  dismiss?: React.CSSProperties;
  message?: {
    clickableContainer?: React.CSSProperties;
    container?: React.CSSProperties;
    contents?: React.CSSProperties;
    icon?: React.CSSProperties;
    textElement?: React.CSSProperties;
    title?: React.CSSProperties;
  };
  progressBar?: React.CSSProperties;
};
```

The style configuration objects should be defined with Style Objects. Style Objects can accept CSS Pseudo selectors for more advanced styling. See [here](https://styled-components.com/docs/advanced#style-objects) for more info or check below for advanced usage examples.

> Styles will be merged with defaults so if you do not explicitly override a style it will not be changed.

<a name="5hooksmd"></a>

## [Using Hook](#using-hook)

If you do not want to use Courier Push to trigger a toast notification then you can always invoke the toast locally with the `useToast` hook. Below is an example creating a notification from the client rather than creating it from a transport. Do not forget to wrap this component with a `CourierProvider` somewhere up the component hierarchy chain.

```js
import { CourierProvider } from "@trycourier/react-provider";
import { Toast, useToast } from "@trycourier/react-toast";

const MyComponent: React.FunctionComponent = () => {
  //We can access this because the parent is a `CourierProvider`
  const [toast] = useToast();

  return (
    <button onClick={() => toast("You just made a notification 🎉")}></button>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <CourierProvider userId={USER_ID} clientKey={CLIENT_KEY}>
      <Toast />
      <MyComponent />
    </CourierProvider>
  );
};
```
