## React Integration

This is a contrived example of using In-App React Components.

The repository for all of our React Components is: [https://github.com/trycourier/courier-react](https://github.com/trycourier/courier-react)

> **All Courier Components** require **CourierProvider** installed from `@trycourier/react-provider`. This handles all of the authentication and integration with the backend.

`yarn add @trycourier/react-provider` or `npm i @trycourier/react-provider`

Using the Courier Provider is easy. At the top level in your React tree, add something that resembles the following. The **Client Key** can be found [here](https://app.courier.com/integrations/courier) and the **User Id** is the identifier you use to identify your user... **this will be used later in the API call to courier.**

```jsx
import { CourierProvider } from "@trycourier/react-provider";
import { Toast } from "@trycourier/react-toast";

const MyApp = ({ children }) => {
  return (
    <CourierProvider clientKey={CLIENT_KEY} userId={USER_ID}>
      <Toast />
      {children}
    </CourierProvider>
  );
};
```

You can add **Toast** to the frontend **anywhere as long as its a child of the CourierProvider.**

`yarn add @trycourier/react-toast` or `npm i @trycourier/react-toast`

```jsx
import { CourierProvider } from "@trycourier/react-provider";
import { Toast } from "@trycourier/react-toast";

const MyApp = ({ children }) => {
  return (
    <CourierProvider clientKey={CLIENT_KEY} userId={USER_ID}>
      <Toast />
      {children}
    </CourierProvider>
  );
};
```

**Inbox** should be added in the application as a child of **CourierProvider**, but where you want the Bell icon to display. For this example, we will just put it right next to **Toast**.
`yarn add @trycourier/react-inbox` or `npm i @trycourier/react-inbox`

```jsx
import { CourierProvider } from "@trycourier/react-provider";
import { Toast } from "@trycourier/react-toast";
import { Inbox } from "@trycourier/react-inbox";

const MyApp = ({ children }) => {
  return (
    <CourierProvider clientKey={CLIENT_KEY} userId={USER_ID}>
      <Toast />
      <Inbox />
      {children}
    </CourierProvider>
  );
};
```
