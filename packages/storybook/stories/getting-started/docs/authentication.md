## Authentication

### Default Authentication

The default authentication is **pretty** open and only relies on your public **Client Key**. This is intentional to make the first implementation easy. As you get closer to a production deployment, we advice so lock down the authentication with the following options.

### Approved Domains

A simple solution to authentication is to provide us with a list of comma delimited approved domains. This means that to acess Courier's client api, you must be requesting from the corresponding domains.

> Regular expressions are supported

### HMAC Signature

While approved domains will prevent a malicous actor from accessing your data on a site that is not yours, it doesn't prevent a user on your page from accessing another user's data. Turning on HMAC allows you to generate a **signature** for each user you have in your system. It is a hash of your userId and your API Key.

> This HMAC should be genrated on the backend and either embedded in your frontend via SSR or you must have an API endpoint to return this value per user.

### Backend

```js
import crypto from "crypto";

const computedUserHmac = crypto
  .createHmac("sha256", process.env.SECRET_API_KEY)
  .update(userId)
  .digest("hex");
```

### Frontend

```js
import { CourierProvider } from "@trycourier/react-provider";
import { Toast } from "@trycourier/react-toast";

const MyComponent = (props) => {
  return (
    <CourierProvider
      userId={props.userId}
      userSignature={props.computedUserHmac}
      clientKey={process.env.COURIER_CLIENT_KEY}
    >
      <Toast />
      {props.children}
    </CourierProvider>
  );
};
```
