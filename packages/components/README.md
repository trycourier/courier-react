# Courier Components

# Table of Contents

1. [Overview](#overview)
2. [Client Install](#client-install)
3. [SDK](#SDK)

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
    <courier component="toast"></courier>
    <courier component="inbox"></courier>
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
      if (iWantToHideThisMessage) {
        return;
      }

      // you can also mutate this message before displaying to a user
      return message;
    });
  });
</script>
```
