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

- window.courier.on((action, cb));

To listen for actions that happen inside Courier's SDK.

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
    };
  };
</script>
```

- `inbox/init`

```html
<script>
  window.courierAsyncInit = () => {
    window.courier.on("inbox/init", () => {
      console.log(window.courier.inbox.config);
    };
  };
</script>
```

## [Configuring Components](#config)

You can configure components in 2 different ways. Inline html attributes but also through `window.courierConfig`. These are the same properties passed to the React components

[Inbox Config](https://github.com/trycourier/courier-react/blob/main/packages/react-inbox/docs/3.props.md)

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

You update configuration of components by using:

`window.courier.inbox.setConfig(config: InboxConfig);`

`window.courier.toast.setConfig(config: ToastConfig);`
