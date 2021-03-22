# Courier Components

# Table of Contents

1. [Overview](#overview)
2. [Client Install](#client-install)
3. [SDK](#SDK)
4. [Configuring Components](#config)

## [Overview](#overview)

## What are Courier Components?

_Courier Components_ are a set of components that can be embedded in any website using a simple `<script>` tag. This is useful if you don't have a React build but still want to use Courier's components.

## [Client Install](#client-install)

Installation is simple. All you need to do is add `<courier>` components to your page and add 2 script tags to the bottom of the `<body>` or `<footer>`.

1. To setup the config
2. To download the script

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

## [SDK](#SDK)

To interact with the components, we have exposed an sdk on `window.courierSdk`. Since this sdk initializes asynchronous, you can create and push initialization functions onto an array named `window.courierAsyncInit`.

Example:

```html
<script type="text/javascript">
  window.courierConfig = {
    clientKey: "{{CLIENT_KEY}}",
    userId: "{{USER_ID}}",
  };

  window.courierAsyncInit = window.courierAsyncInit || [];
  window.courierAsyncInit.push(() => {
    window.courierSdk.toast({
      title: "Hello",
      body: "World",
    });

    window.courierSdk.transport.intercept((message) => {
      const iWantToHideThisMessage = true;
      if (iWantToHideThisMessage) {
        return;
      }

      // you can also mutate this message before displaying to a user
      return message;
    });
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
