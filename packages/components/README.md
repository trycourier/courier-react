# Courier Components

# Table of Contents

1. [Overview](#overview)
2. [Initialization](#initialization)
3. [Config Options](#config-options)
4. [Async Init](#async-init)
5. [Courier SDK](#courier-sdk)
6. [Configuring Components](#config)

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
  <script src="https://courier-components-xvdza5.s3.amazonaws.com/latest.js"></script>
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

## [Asynchronous Initialization](#async-init)

To interact with Courier and its components, we have exposed an sdk on `window.courierSdk`. Since this sdk initializes asynchronous, you can create and push initialization functions onto an array named `window.courierAsyncInit`. When the sdk is ready we will call all the functions on this array.

Example:

```html
<script type="text/javascript">
  window.courierAsyncInit = window.courierAsyncInit || [];
  window.courierAsyncInit.push(() => {
    console.log("Courier is Ready!");
  });
</script>
```

## [Courier SDK](#courier-sdk)

After Courier has initialized, the object `window.courierSdk` is ready.

- window.courierSdk.init(config);

Use this function to initialize the rendering of the Courier components if you were not able to initialize synchronously.

- window.courierSdk.on((action, cb));

To listen for actions that happen inside Courier's SDK.

## [SDK Actions](#sdk-actions)

- `toast/init`
  Called when the Toast component has been initialized

```html
<script>
  window.courierAsyncInit.push(() => {
    window.courierSdk.on("toast/init", () => {
      window.courierSdk.toast({
        title: "Hello",
        body: "World",
      });
    };
  });
</script>
```

- `inbox/init`

```html
<script>
  window.courierAsyncInit.push(() => {
    window.courierSdk.on("inbox/init", () => {
      console.log(window.courierSdk.inbox.config);
    };
  });
</script>
```

## [Configuring Components](#config)

You can configure components in 2 different ways. Inline html attributes but also through `window.courierConfig`.

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
