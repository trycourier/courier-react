<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Props](#props)
- [Listening to Messsages](#listening-to-messsages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0propsmd"></a>

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
  onMessage?: (message?: ICourierMessage) => ICourierMessage | undefined;

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
    widgetBackground?: {
      topColor?: string;
      bottomColor?: string;
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

### [Listening to Messsages](#listening)

There are a few ways to listen for messages and being able react.

1. Via Props

```tsx
import { CourierProvider } from "@trycourier/react-provider";

const MyApp = ({ children }) => {
  const handleOnMessage = (messsage: ICourierMessage) => {
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
