# Courier Components

# Table of Contents

- [Courier Components](#courier-components)
- [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [What are Courier Components?](#what-are-courier-components)
  - [Initialization](#initialization)
  - [Config Option](#config-option)
  - [Asynchronous Initialization](#asynchronous-initialization)
  - [Courier SDK](#courier-sdk)
  - [SDK Actions](#sdk-actions)
  - [Configuring Components](#configuring-components)
  - [Updating Component Configs](#updating-component-configs)

## [Overview](#overview)

## What are Courier Components?

_Courier Components_ are a set of components that can be embedded in any website using a simple `<script>` tag. This is useful if you don't have a React build but still want to use Courier's components.

## [Initialization](#initialization)

Installation is simple. All you need to do is add `<courier>` components to your page and add 2 script tags to the bottom of the `<body>` or `<footer>`.

1. Setup Courier Configurations
2. Download the Components

> This section covers synchronous initialization where you have all information like the `clientKey` and `userId` available on first render. See `Async Initialization` below for how to control the initialization.

```html
<body>
  <section>
    <h1>Hello World</h1>
    <courier-toast></courier-toast>
    <courier-inbox></courier-inbox>
  </section>
  <script type="text/javascript">
    window.courierConfig = {
      clientKey: "{{CLIENT_KEY}}",
      userId: "{{USER_ID}}",
    };
  </script>
  <!-- Be sure to use the appropriate version -->
  <script src="https://courier-components-xvdza5.s3.amazonaws.com/v{{CURRENT_VERSION}}.js"></script>
</body>
```

## [Config Option](#config-options)

The supported configuration of `window.courierConfig` are:

| Key        | Type              | Description                                                                                                           |
| ---------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| clientKey  | `string`          | Key associated with your account. Found on https://app.courier.com/integrations/courier                               |
| userId     | `string`          | The current user logged into your app. Associated with Courier's `recipientId`                                        |
| initOnLoad | `boolean`         | If you don't want Courier to try and render the components right away, you can pass this flag to defer initialization |
| components | `ComponentConfig` | Map of configuration for each component (`toast` and `inbox`) on the page                                             |

> The components will not render unless we have both the `userId` and `clientKey`

## [Asynchronous Initialization](#async-init)

To interact with Courier and its components, we have exposed an sdk on `window.courier`. Since this sdk initializes asynchronous, you can use `window.courierAsyncInit` to know when the Courier code has been loaded.

`window.courierAsyncInit` can either be a function or an array. Arrays are useful if you want to separate the logic for each component to different files.

- Function Example:

```html
<script type="text/javascript">
  window.courierAsyncInit = () => {
    console.log("Courier is Ready!");
  };
</script>
```

- Array Example:

```html
<script type="text/javascript">
  window.courierAsyncInit = window.courierAsyncInit || [];
  window.courierAsyncInit.push(() => {
    console.log("Courier is Ready!");
  });
</script>
```

## [Courier SDK](#courier-sdk)

After Courier has initialized, the object `window.courier` is ready.

- window.courier.init(config);

Use this function to initialize the rendering of the Courier components if you were not able to initialize synchronously.

- window.courier.on(action, callback);

To listen for actions inside Courier's SDK like `root/init`, `inbox/init`, or `toast/init`. Specifying `*` as your action will invoke for every event, which is helpful for debugging.

```javascript
window.courier.on("*", (payload) => {
  console.log(payload);
});
```

NOTE: The following are equivalent, we check the lowercase of the action.

```javascript
window.courier.on("root/init", () => {});
window.courier.on("root/INIT", () => {});
```

## [SDK Actions](#sdk-actions)

- `toast/init`

```html
<script>
  window.courierAsyncInit = () => {
    window.courier.on("toast/init", () => {
      window.courier.toast({
        title: "Hello",
        body: "World",
      });
    });
  };
</script>
```

- `inbox/init`

```html
<script>
  window.courierAsyncInit = () => {
    window.courier.on("inbox/init", () => {
      console.log(window.courier.inbox.config);
    });
  };
</script>
```

## [Renew Session](#renew-session)

If you are utilizing the TTL for a JWT auth token, you can reset the authtoken by calling `window.courier.renewSession(token: string);`

## [Inbox](#inbox)

You can access all of the inbox state and actions on window.courier.inbox.

State Properties:

```typescript
interface IInboxState = {
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMarkedAllRead?: number;
  lastMessagesFetched?: number;
  messages?: Array<T>;
  pinned?: Array<T>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: string | "preferences";
}
```

Action Properties:

Many of these actions will fire and the state will update from them, they won't return anything but the state will be updated.

```typescript
interface IInboxActions = {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox?: IInbox) => void;
  markAllAsRead: (fromWS?: boolean) => void;
  markMessageArchived: (messageId: string) => Promise<void>;
  markMessageOpened: (messageId: string) => Promise<void>;
  markMessageRead: (messageId: string) => Promise<void>;
  markMessageUnread: (messageId: string) => Promise<void>;
  setView: (view: string | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;

  // tracking a click requires the message.trackingIds.clickTrackingId to work
  trackClick: (messageId: string, trackingId: string) => Promise<void>;
  unpinMessage: (messageId: string) => Promise<void>;
}
```

## [Configuring Components](#config)

You can configure components in 2 different ways. Inline html attributes but also through `window.courierConfig`. These are the same properties passed to the React components

[Inbox Config](https://github.com/trycourier/courier-react/blob/main/packages/react-inbox/README.md#props)

[Toast Config](https://github.com/trycourier/courier-react/blob/main/packages/react-toast/docs/3.props.md)

> Inline configuration attributes will take precedence over `window.courierConfig` options

1. Inline

Configuring simple options through HTML attributes is simple. For each configuration, make sure you are using `kebab-case` https://www.theserverside.com/definition/Kebab-case instead of `camelCase` because HTML attributes are case insensitive.

Example:

```html
<courier-toast auto-close="false"></courier-toast>
```

2. `window.courierConfig`

Some components have many options and adding many attributes to HTML entities can be cumbersome, you can also add configuration through our `window.courierConfig` object.

Example:

```javascript
window.courierConfig = {
  components: {
    toast: {
      autoClose: false,
    },
  },
};
```

## [Updating Component Configs](#updating-config)

You update the configuration of components by using:

`window.courier.inbox.setConfig(config: InboxConfig);`

`window.courier.toast.setConfig(config: ToastConfig);`

## [Using Preferences API](#using-preferences-api)

This library provides access to advanced user preferences through `window.courier.preferences`. The available APIs can be found [in Courier's graphql-client](../client-graphql/src/preferences.ts) and have built-in tenant support after initializing the client. The following methods are available to start fetching or updating the preferences. The following functions will dispatch the request; you must listen to `preferences/*/done` events to retrieve the data after the request is finished ([see below](#preference-event-data)).

**\*fetchRecipientPreferences**: (tenantId?: string) => void\*
Retrieves the recipient preferences for the given user. The preferences for the user's tenant will be displayed if provided.

```javascript
window.courier.preferences.fetchRecipientPreferences();
window.courier.preferences.fetchRecipientPreferences("tenant_a");
```

**\*fetchPreferencePage**: (tenantId?: string, draft: boolean = false) => void\*
Retrieves the preference pages for subscription topics with their respective defaults defaults. The default preferences for the tenant will be displayed if provided. You will use this in combination with getRecepientPreferences to build a customer user interface that displays the user's preferences.

```javascript
window.courier.preferences.fetchPreferencePage();
window.courier.preferences.fetchPreferencePage("tenant_a");
```

**\*updateRecipientPreferences**: ( payload: [UpdateRecipientPreferencesPayload]() ) => void\*
Update the user's preference for a specific Subscription Topic (templateId) and an optional tenant (tenantId).

```typescript
interface UpdateRecipientPreferencesPayload {
  templateId: string;
  status: string;
  hasCustomRouting: boolean;
  routingPreferences: Array<string>;
  digestSchedule: string;
  tenantId?: string;
}

window.courier.preferences.updateRecipientPreferences({
  templateId: "ABC",
  status: "OPTED_IN",
  hasCustomRouting: false,
  routingPreferences: [],
  digestSchedule: null,
});

window.courier.preferences.updateRecipientPreferences({
  templateId: "ABC",
  status: "OPTED_OUT",
  hasCustomRouting: false,
  routingPreferences: [],
  digestSchedule: null,
  tenantId: "tenant_a",
});
```

### [Preference Event Data](#preference-event-data)

When using this library's [preference APIs](#using-preferences-api), there are two methods for retrieving the preference data associated with the user and tenant. First is to access it through `window.courier.preferences.preferencePage` and `window.courier.preferences.recipientPreferences` after calling their respective fetches. Alternatively, you can use this package's `.on()` to listen for calls to be finished.

```javascript
window.courier.on("preferences/fetch_preference_page/done", (payload) => {
  // do something
});
window.courier.on("preferences/fetch_recipient_preferences/done", (payload) => {
  // do something
});
window.courier.on("preferences/update_recipient_preferences/done", () => {
  // do something
});
```

## [Listening to Inbox Events](#events)

You can listen to inbox events by adding a function to window.courierConfig.components.inbox.onEvent.

```typescript
type EventType = "read" | "unread" | "archive" | "click" | "mark-all-read" | "unpin";
interface IEventParams = {
  message?: IInboxMessagePreview;
  messageId?: string;
  event: EventType;
}
type OnEvent = (params: IEventParams) => void;

```
