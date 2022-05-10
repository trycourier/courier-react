<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is Toast?](#what-is-toast)
  - [What is a `toast`?](#what-is-a-toast)
  - [How does @trycourier/react-toast work?](#how-does-trycourierreact-toast-work)
- [Client Install](#client-install)
- [Courier Integration](#courier-integration)
- [Client Setup](#client-setup)
- [Props](#props)
- [Theme](#theme)
- [Using Hook](#using-hook)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="1overviewmd"></a>

## What is Toast?

Toast aims to be the easiest way to create in-app notifications. With a simple integration and straight forward API we make it easy for anyone to integrate fast.

### What is a `toast`?

A toast is just a buzz word for a notification that happens in-app. The appearance is usually that of a rectangle (which is where the toast name comes from).

### How does @trycourier/react-toast work?

There are two ways to use this library:

1. With Courier as a transport provider
2. A standalone toast interface

You can use the [Courier Push integration](https://app.courier.com/integrations/courier) to create a notification through the designer and send a notification to a specific channel/event from an API request. This will trigger the toast to show wherever the client is running and listening for that same channel/event.

A channel/event combination is simply a stream on which a particular client is listening for toast notifications. A client must be subscribed to a channel and event in order to receive a notification.

If you do not need a push provider such as Courier you can skip ahead to instructions on how to use the standalone toast <a href="#using-hook">interface<a>

Below is a step by step setup to use `@trycourier/react-toast` using Courier as a Push Provider.

<a name="2installationmd"></a>

## [Client Install](#client-install)

```js
yarn add @trycourier/react-toast
```

## [Courier Integration](#courier-integration)

We will need to install the [Courier Push Provider](https://app.courier.com/integrations/courier) to trigger a toast from an API request.
Make sure to copy the Client Key from the integration page after installing.

![image](https://user-images.githubusercontent.com/16184018/109491559-8f8ee600-7a3e-11eb-9aa4-742639274fde.png)

Next, create your notification on the Courier Push Designer

![image](https://user-images.githubusercontent.com/16184018/109492317-a41fae00-7a3f-11eb-9368-fd424699d640.png)

Once your notification is created, you also have the option to map an EVENT_ID to a specific notification. This will allow you to use the Courier Designer for test sending.
To do this access the settings pane near the top left corner next to the "Notifications" label. Navigate to "Events" and select an event or create a new one to send the toast on.

![image](https://user-images.githubusercontent.com/16184018/109494158-5d7f8300-7a42-11eb-96e8-078023daa14d.png)

## Client Setup

Now that you have a notification ready to be sent lets setup the client to listen for the notification and invoke it when triggered.

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
    actionBlock?: React.CSSProperties;
    textBlock?: React.CSSProperties;
    body?: React.CSSProperties;
    contents?: React.CSSProperties;
    icon?: React.CSSProperties;
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
  const [show] = useToast();

  return (
    <button onClick={() => show("You just made a notification 🎉")}></button>
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
