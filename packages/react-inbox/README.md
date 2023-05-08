<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is Inbox?](#what-is-inbox)
  - [3.X Breaking Changes:](#3x-breaking-changes)
  - [Message Interface](#message-interface)
  - [Theme](#theme)
- [Installation](#installation)
  - [Courier Provider](#courier-provider)
- [Authentication](#authentication)
  - [JWT Authentication (Recommended)](#jwt-authentication-recommended)
  - [Token Expiration](#token-expiration)
  - [HMAC Authentication (Legacy)](#hmac-authentication-legacy)
  - [Props](#props)
  - [Hooks](#hooks)
  - [Theme](#theme-1)
  - [Render Props](#render-props)
  - [Pinning](#pinning)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0overviewmd"></a>

## [What is Inbox?](#what-is-inbox)

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

### [3.X Breaking Changes](#3x-breaking-changes):

The _classic_ styling of the inbox has been deprecated. You can find more information about the old styling [here](https://github.com/trycourier/courier-react/tree/v2.0.1/packages/react-inbox). In summary, you can access the old styling and non-breaking changes by installing the 2.0.1 version linked above for `@trycourier/react-inbox` and `@trycourier/react-provider`.

_Updated Theme:_

![image](https://user-images.githubusercontent.com/7017640/207160274-ade22e0d-e919-4b4b-af27-f06cdd26b47d.png)

Some of the main differences are the following:

1.  Single list of messages for all messages instead of "Unread/All Messages"
2.  Messages with one action block will now be clickable instead of rendering a button. There is a hover effect on the message to let the user know they can click on the entire message.
3.  Archiving is message is now available via the UI

### [Message Interface](#message-interface)

The format of the message has changd, so if you have any code that utilizes any of the following you will need to update:

1. Interacting with `useInbox`. See
2. Intercepting messages with Courier Provider prop onMessage
3. Implemented `renderMessage` or `renderAction`

This is a contrived example of the changes:

> Note we are utilized our new [elemental](https://www.courier.com/docs/elemental/elements/) standard:

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

### [Theme](#theme)

- theme.tabList -> deprecated
- theme.message.actionBlock
  - the entire message is now clickable when you have 1 button
  - when 2 buttons you use theme.message.actionElement to style
- theme.message.textBlock -> theme.message.textElement

New Theme Properties:

- `theme.tooltip`: accesses background and colors of tooltips
- `theme.menu`: clicking on the inbox title opens a dropdown menu with options to edit `preferences`
- `theme.message.clickableContainer`: when a message has an action href, we now make the entire message clickable instead of rendering an explicit button. this theme property allows access to this component. `theme.message.container` will still apply to this component but if you want to target the clickableContainer separatly you can target `theme.message.clickableContainer` which will be an `anchor` element instead of a `div`;

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
  labels: InboxProps["labels"];
  markAllAsRead: () => void;
  messages: IInboxMessagePreview[];
  title?: string;
  unreadMessageCount?: number;
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
  renderPin?: React.FunctionComponent<PinDetails>;
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
  brand?: Brand;
  container?: CSSObject;
  emptyState?: CSSObject;
  footer?: CSSObject;
  header?: CSSObject;
  menu?: CSSObject;
  tooltip?: CSSObject;
  icon?: CSSObject & {
    open?: string;
    closed?: string;
  };
  messageList?: {
    container?: CSSObject;
  };
  message?: {
    actionElement?: CSSObject;
    clickableContainer?: CSSObject;
    container?: CSSObject;
    content?: CSSObject;
    icon?: CSSObject;
    textElement?: CSSObject;
    timeAgo?: CSSObject;
    title?: CSSObject;
    unreadIndicator?: CSSObject;
  };
  root?: CSSObject;
  unreadIndicator?: CSSObject;
}
```

> Since we are themeing with CSSObject from styled components, there are some themes that you may need to target by specifiying classNames. For example, to theme the `read` message styling you would do:

```typescript
const theme = {
  message: {
    container: {
      "&.read": {
        background: "red",
      },
      "&:not(.read):hover": {
        background: "blue",
      },
    },
  },
};
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
  renderHeader?: React.FunctionComponent<IHeaderProps>;
  renderPin?: React.FunctionComponent<PinDetails>;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;
```

<a name="6pinningmd"></a>

### [Pinning](#pinning)

Pinning is a new feature as of 3.6.0 that allows you to "pin" certain messages to the top of their inbox. The pins are configured into `slots` by editing your brand in the [Courier Studio]("https://app.courier.com/brands) or by passing in a brand object with the correct pin slots. A pin slot is defined as:

```typescript
interface PinSlot {
  id: string;
  label: {
    value?: string;
    color?: string;
  };
  icon: {
    value?: string;
    color?: string;
  };
}
```

The default Pin looks like:

![image](https://user-images.githubusercontent.com/7017640/236919801-fae03134-41e6-4fb4-9e8d-62c55ebca6a9.png)

They can be configured to look like:

![image](https://user-images.githubusercontent.com/7017640/236103836-eccc0fb8-26b2-4ca0-8b28-8474a9ddbd18.png)

---

You can override the styling of the Pin through css accessing `theme?.message?.pinned` or by passing in a `renderPin(pinSlot)` as a property to the <Inbox> component.
