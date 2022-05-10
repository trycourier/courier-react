<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Props](#props)
- [Listening to Messsages](#listening-to-messsages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0propsmd"></a>

### [Props](#props)

```
export interface ICourierProvider {
  // Public Client Key used to identify your workspace
  clientKey?: string;

  // Matches the recipient/user id used in Courier
  userId?: string;

  // HMAC signature
  userSignature?: string;

  // Callback to listen for new messages
  onMessage?: Interceptor;
}
```

<a name="1listening-to-messagesmd"></a>

### [Listening to Messsages](#listening)

There are a few ways to listen for messages and being able react.

1. Via Props

```
import { CourierProvider } from "@trycourier/react-provider";

const MyApp = ({ children }) => {
  const handleOnMessage = (messsage: ICourierMessage) => {
    console.log(message);
    return message;
  }

  return (
    <CourierProvider onMessage={handleOnMessage}>
      {children}
    </CourierProvider>
  )
}
```

2. Via Transport

You can create a Transport and pass it into CourierProvider.

```

import { useEffect } from 'react';
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
  })

  return (
    <CourierProvider transport={courierTransport}>
      {children}
    </CourierProvider>
  )
}
```

3. Via useCourier hook

If you don't pass in a transport, we will automatically create one. You can then access the transport via the CourierContext exposed through useCourier.

```
import { useEffect } from 'react';
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
  })

  return (
    <div>Hello World</div>
  );
}


const MyApp = ({ children }) => {
  return (
    <CourierProvider>
      <MyComponent />
    </CourierProvider>
  )
}
```
