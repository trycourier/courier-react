## 🚨 THIS PROJECT HAS MOVED 🚨

**This repository is deprecated. For the latest features, bug fixes, and more, visit [Courier React SDK documentation](https://www.courier.com/docs/sdk-libraries/courier-react-web) or upgrade using the [v8 Migration Guide](https://www.courier.com/docs/sdk-libraries/courier-react-v8-migration-guide).**

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Version 5.X CSP Migration](#version-5-csp-migration)
- [Props](#props)
- [Listening to Messages](#listening-to-messages)
- [Dark Mode / Theme Variables](#dark-mode--theme-variables)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0propsmd"></a>

### [Version 5.X CSP Migration](#version-5-migration)

We've released new subdomains to power Inbox and Toast. This migration only applies to Inbox and Toast users who applied our old URLs to their Content Security Policy.

| Before                                                 | After                      | Usage                       |
| ------------------------------------------------------ | -------------------------- | --------------------------- |
| https://api.courier.com                                | https://api.courier.com    | Brands and User Preferences |
| wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com   | wss://realtime.courier.com | Websockets                  |
| https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com | https://inbox.courier.com  | Inbox Messages              |

### [Props](#props)

```ts
interface ICourierProvider {
  /**
   * Token from the Courier auth/issue-token endpoint. Should have
   * user_id scope (user_id:<user-id-here>) and inbox:read:messages at a
   * minimum.
   */
  authorization?: string;
  brand?: Brand;
  brandId?: string;

  /** Allows the browser to modify or react to a received message before the message is displayed to the user */
  onMessage?: (
    message?: IInboxMessagePrpeview
  ) => IInboxMessagePrpeview | undefined;

  /** Courier client key. Along with userId and userSignature this can be used as an alternative to the authorization field / token. */
  clientKey?: string;
  /** Required if using client key and signature */
  userId?: string;
  /** User id signed by courier api key (hmac) */
  userSignature?: string;

  wsOptions?: WSOptions;
}

interface WSOptions {
  url?: string;
  onError?: (error: { message: string; error: Error }) => void;
  onClose?: () => void;
  connectionTimeout?: number;
}

interface Brand {
  inapp?: {
    disableCourierFooter?: boolean;
    borderRadius?: string;
    disableMessageIcon?: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    emptyState?: {
      textColor?: string;
      text?: string;
    };
    icons?: {
      bell?: string;
      message?: string;
    };
    toast?: {
      borderRadius?: string;
      timerAutoClose?: number;
    };
  };
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}
```

<a name="1listening-to-messagesmd"></a>

### [Listening to Messages](#listening)

There are a few ways to listen for messages and being able react.

1. Via Props

```tsx
import { CourierProvider } from "@trycourier/react-provider";

const MyApp = ({ children }) => {
  const handleOnMessage = (message: IInboxMessagePreview) => {
    console.log(message);
    return message;
  };

  return (
    <CourierProvider onMessage={handleOnMessage}>{children}</CourierProvider>
  );
};
```

2. Via Transport

You can create a Transport and pass it into CourierProvider.

```tsx
import { useEffect } from "react";
import { CourierProvider, CourierTransport } from "@trycourier/react-provider";

const courierTransport = new CourierTransport({
  clientKey: CLIENT_KEY,
});

const MyApp = ({ children }) => {
  useEffect(() => {
    courierTransport.intercept((message) => {
      console.log(message);
      return message;
    });
  });

  return (
    <CourierProvider transport={courierTransport}>{children}</CourierProvider>
  );
};
```

3. Via useCourier hook

If you don't pass in a transport, we will automatically create one. You can then access the transport via the CourierContext exposed through useCourier.

```tsx
import { useEffect } from "react";
import { CourierProvider, useCourier } from "@trycourier/react-provider";

const courierTransport = new CourierTransport({
  clientKey: CLIENT_KEY,
});

const MyComponent = () => {
  const courier = useCourier();

  useEffect(() => {
    courier.transport.intercept((message) => {
      console.log(message);
      return message;
    });
  });

  return <div>Hello World</div>;
};

const MyApp = ({ children }) => {
  return (
    <CourierProvider>
      <MyComponent />
    </CourierProvider>
  );
};
```

<a name="2dark-modemd"></a>

### [Dark Mode / Theme Variables](#dark-mode)

Dark mode is supported by passing "theme.colorMode" to the CourierProvider

```tsx
import { CourierProvider } from "@trycourier/react-provider";

const MyApp = ({ children }) => {
  return (
    <CourierProvider theme={{ colorMode: "dark" }}>{children}</CourierProvider>
  );
};
```

You can customize dark mode by passing in variables to the root level theme:

```typescript
export interface ThemeVariables {
  background?: string;
  textColor?: string;
  titleColor?: string;
  structure?: string;
  icon?: string;
}
```

```tsx
import { CourierProvider } from "@trycourier/react-provider";

const MyApp = ({ children }) => {
  return (
    <CourierProvider
      theme={{
        variables: {
          background: "red",
          textColor: "blue",
          titleColor: "green",
          structure: "pink",
          icon: "orange",
        },
      }}
    >
      {children}
    </CourierProvider>
  );
};
```
