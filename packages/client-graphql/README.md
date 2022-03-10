## Courier Client GraphQl

Courier GraqphQl Client for usage in the browser.

### Messages

```js
import { Messages } from "@trycourier/client-graphql";
const messagesApi = Messages({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET",
});

const getMyMessageCount = async (params?: {
  isRead?: boolean,
  from?: number,
}) => {
  const messageCount = await messagesApi.getMessageCount(params);
  return messageCount;
};

const getMyMessages = async (params?: {
  after?: string,
  isRead?: boolean,
  from?: number,
}) => {
  const { startCursor, messages } = await messagesApi.getMessages(params);

  return {
    startCursor,
    messages,
  };
};
```

### Events

```js
import { Events } from "@trycourier/client-graphql";
const eventsApi = Events({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET",
});

const trackMyEvent = async (trackingId: string) => {
  await eventsApi.trackEvent(trackingId);
};
```

### Brands

```js
import { Brands } from "@trycourier/client-graphql";
const brandsApi = Brands({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET",
});

const getMyBrand = async (brandId?: string) => {
  const myBrand = await brandsApi.getBrand(brandId);
  return myBrand;
};
```
