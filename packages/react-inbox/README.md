<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [New Inbox Styling](#new-inbox-styling)
- [What is Inbox?](#what-is-inbox)
- [Installation](#installation)
  - [Courier Provider](#courier-provider)
- [Authentication](#authentication)
  - [JWT Authentication (Recommended)](#jwt-authentication-recommended)
  - [Token Expiration](#token-expiration)
  - [HMAC Authentication (Legacy)](#hmac-authentication-legacy)
  - [Props](#props)
  - [Hooks](#hooks)
  - [Theme](#theme)
  - [Render Props](#render-props)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0overviewmd"></a>

## New Inbox Styling

2022-12-12: We've released a new styling of Inbox (seen below). The new Inbox is streamlined and simplified and focuses on a single list of messages instead of the multi tabbed approach. There should be no changes required of you to utilize these new designs.

Breaking Changes:

- New Default UI Styling (See Below)

_Classic Theme:_
![image](https://user-images.githubusercontent.com/7017640/207160099-5f0d1229-4832-4c41-be3f-a0873fafba46.png)

_Updated Theme:_
![image](https://user-images.githubusercontent.com/7017640/207160274-ade22e0d-e919-4b4b-af27-f06cdd26b47d.png)

> To opt out of the new theme, pass `theme.name === 'classic'` as a property to you <Inbox /> component

Some of the main differences are the following:

1.  Single list of messages for all messages instead of "Unread/All Messages"
2.  Messages with one action block will now be clickable instead of rendering a button. There is a hover effect on the message to let the user know they can click on the entire message.
3.  Archiving is message is now available via the UI

## What is Inbox?

Inbox is a React component that you can add to your application and show a user a list of recent messages they have received. Each message supports the following events:

1. `Opened`
   When the Inbox is opened and a message is in view, we will fire off `opened` events. One event per message. We will not send > 1 opened per message.
2. `Read/Unread`
   ![image](https://user-images.githubusercontent.com/7017640/207160891-c4c7d339-d88d-40eb-af70-700a2db13824.png)
   ![image](https://user-images.githubusercontent.com/7017640/207160948-b2df9e76-c6f2-4d88-9eb7-6efc4ed8905d.png)
3. `Clicked`
   If a message has a click action associated with it, we will track clicks in the Courier Studio. The message will have a hover effect if the message is clickable as seen below.
   ![image](https://user-images.githubusercontent.com/7017640/207162041-56161fdc-443e-49df-9040-7c0eb3c1f9ef.png)
4. `Archive`
   ![image](https://user-images.githubusercontent.com/7017640/207161575-3731bad0-1677-485f-b927-df08b2388155.png)

<a name="1installationmd"></a>

## [Installation](#installation)

Inbox requires a backend to pull messages. This is all done through the [CourierProvider](https://github.com/trycourier/courier-react/tree/main/packages/react-provider) and requires an account at [Courier](https://www.courier.com). To set up the Inbox you will need to install the Courier Provider from the [integrations page](https://app.courier.com/integrations/courier).
After installing the integration you will be provided with a Client Key that you will pass into the CourierProvider.

![image](https://user-images.githubusercontent.com/7017640/207163131-df6b733b-5d36-4dbc-b03f-2dba017bb9e3.png)

Install the following packages to get started:

```js
yarn add @trycourier/react-provider
yarn add @trycourier/react-inbox
```

> @trycourier/react-provider is a peer dependeny of @trycourier/react-inbox and must also be installed

### [Courier Provider](#courier-provider)

In order for the `Inbox` component to be placed in the dom you will need to use the `CourierProvider`. This will handle context and give us access Courier's backend API.

> Check [here](https://reactjs.org/docs/context.html#contextprovider) for more information on this concept.

```js
//App.js
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

function App() {
  // YOUR_CLIENT_KEY is a public facing key and can be found at https://app.courier.com/integrations/courier
  return (
    <CourierProvider userId={yourUserId} clientKey={YOUR_CLIENT_KEY}>
      <Inbox />
    </CourierProvider>
  );
}
```

<a name="2authenticationmd"></a>

## [Authentication](#authentication)

By default the Courier Provider does **not** have authentication enabled. This is intentional and is helpful in getting things up and running. All that is required initially is the _clientKey_ and a _userId_.

> Information about the _clientKey_ and authentication configuration can be found at https://app.courier.com/integrations/courier

### [JWT Authentication (Recommended)](#jwt)

The recommended way of doing authentication with Courier Inbox is to generate a JWT token for each user using the inbox. You can learn more about how to issue a token here: https://www.courier.com/docs/reference/auth/issue-token/

The required scopes are the following:

1. `read:messages` - so we can fetch the messages
2. `write:events` - so we can create events like `read/unread/archive`

An example payload to the `issue-token` api looks like :

```json
{
  "scope": "user_id:MY_USER_ID read:messages write:events"
}
```

The token that is returned can then be used the following way:

```js
//App.js
import { useState, useEffect } from "react";
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

function App() {
  const [authentication, setAuthentication] = useState();

  useEffect(() => {
    const response = await fetchAuthToken();
    setAuthentication(response);
  }, []);

  return (
    <CourierProvider userId={yourUserId} authentication={authentication}>
      <Inbox />
    </CourierProvider>
  );
}
```

### [Token Expiration](#jwt-expiration)

If you need your tokens to expire periodically you can pass an `expires_in` property to the token generation.

```json
{
  "scope": "user_id:MY_USER_ID read:messages write:events",
  "expires_in": "1h"
}
```

```js
//App.js
import { useState, useEffect } from "react";
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

function App() {
  const [authentication, setAuthentication] = useState();

  useEffect(() => {
    const response = await fetchAuthToken();
    setAuthentication(response);

    const interval = setInterval(async () => {
      const response = await fetchAuthToken();
      setAuthentication(response);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CourierProvider userId={yourUserId} authentication={YOUR_CLIENT_KEY}>
      <Inbox />
    </CourierProvider>
  );
}
```

### [HMAC Authentication (Legacy)](#hmac)

You can also provide an HMAC token to be used. This has been replaced with JWT tokens. Please use JWT over HMAC as JWT allows you to create fine grain scopes and HMAC does not.

HMAC allows you to generate a signature for each user you have in your system. It is a hash of your userId and your API Key.

```js
import crypto from "crypto";

const computedUserHmac = crypto
  .createHmac("sha256", apiKey)
  .update(userId)
  .digest("hex");
```

Make sure you **DO NOT** do this on your frontend because your API Key is private and you do not want to leak it. This HMAC should be genrated on the backend and either embedded in your frontend via SSR or you must have an API endpoint to return this value per user.
After you have this HMAC returned, you can provide it to the `CourierProvider` property. This is typically done inside an api that returns user information. `i.e. GET /user/:user-id`

```js
import { CourierProvider } from "@trycourier/react-provider";
import { Inbox } from "@trycourier/react-inbox";

const MyComponent = (props) => {
  return (
    <CourierProvider
      userId={props.userId}
      userSignature={props.computedUserHmac}
      clientKey={process.env.COURIER_CLIENT_KEY}
    >
      <Inbox />
      {props.children}
    </CourierProvider>
  );
};
```

<a name="3propsmd"></a>

### [Props](#props)

```
interface IHeaderProps {
  title: string;
  unreadMessageCount?: number;
  markAllAsRead?: () => any;
  currentTab?: ITab;
  messages: IMessage[];
}

interface ITextBlock {
  type: "text";
  text: string;
}

interface IActionBlock {
  type: "action";
  text: string;
  url: string;
}

interface InboxProps {
  //Brand Override
  brand?: Brand;

  //Icon Class Name
  className?: string;

  // defaults to true
  openLinksInNewTab?: boolean;

  // Default Icon to use if no Icon is present in Message
  defaultIcon?: false | string;

  formatDate?: (date: string) => string;
  labels?: {
    archiveMessage?: string;
    closeInbox?: string;
    emptyState?: string;
    markAllAsRead?: string;
    markAsRead?: string;
    markAsUnread?: string;
  }

  // Placement of the Bell relative to the Inbox
  placement?: "top" | "left" | "right" | "bottom";

  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
  }>;
  renderBlocks?: {
    action?: React.FunctionComponent<IActionBlock>;
    text?: React.FunctionComponent<ITextBlock>;
  }
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent<IHeaderProps>;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;

  theme?: ThemeObject;
  title?: string;
  trigger?: "click" | "hover";
}
```

<a name="4hooksmd"></a>

### [Hooks](#hooks)

`useInbox` is a hook that you can import and use to interact with Inbox without having to use any of the react components. Think of it as a `headless` Inbox.

See https://github.com/trycourier/courier-react/tree/main/packages/react-hooks

<a name="4thememd"></a>

### [Theme](#theme)

```
interface ITheme {
  container?: React.CSSProperties;
  dismissInbox?: React.CSSProperties;
  emptyState?: React.CSSProperties;
  footer?: React.CSSProperties;
  header?: React.CSSProperties;
  icon?: React.CSSProperties & {
    open?: string;
    closed?: string;
  };
  messageList?: {
    container?: React.CSSProperties;
  };
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
  };
  root?: React.CSSProperties;
}
```

<a name="5render-propsmd"></a>

### [Render Props](#render-props)

[Render Props](https://reactjs.org/docs/render-props.html) are a react concept that allows you to supply your own react components instead of the ones built for this library. **Inbox** supplies render props for most sub components.

To overrwrite the rendering of each of these you can supply your own react component.

```
// Render Props for Custom Rendering
  renderBlocks?: {
    action?: React.FunctionComponent<IActionBlock>;
    text?: React.FunctionComponent<ITextBlock>;
  };
  renderContainer?: React.FunctionComponent;
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
  }>;
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;
```
