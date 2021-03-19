# Courier Components

# Table of Contents

1. [Overview](#overview)
2. [Client Install](#client-install)

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
