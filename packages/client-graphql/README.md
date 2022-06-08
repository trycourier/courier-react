## Courier Client GraphQl

Courier GraqphQl Client for usage in the browser.

### Initialization

You can initialize each module with either an object containing:

```
{
  clientKey: string;
  userId: string;
  userSignature?: string,
}
```

Or alternately, you can use an issued [authorization token](https://www.courier.com/docs/reference/auth/issue-token/).

```
{
  authorization: string;
}
```

You can also create the client separately and pass the client in:

```
import { createCourierClient } from "@trycourier/client-graphql";
const courierClient = createCourierClient({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET",
});
const messages = Messages({ client: courierClient })
const events = Events({ events: courierClient })
const events = Brands({ events: courierClient })
```

### Messages

```js
import { Messages } from "@trycourier/client-graphql";

const messagesApi = Messages({ authorization: "abc123" });

const getMessageCount = async (params?: {
  isRead?: boolean,
  from?: number,
  tags?: string[],
}) => {
  const messageCount = await messagesApi.getMessageCount(params);
  return messageCount;
};
const getMessages = async (
  params?: {
    isRead?: boolean,
    from?: number,
    tags?: string[],
  },
  after?: string
) => {
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
const trackEvent = async (trackingId: string) => {
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
const getBrand = async (brandId?: string) => {
  const myBrand = await brandsApi.getBrand(brandId);
  return myBrand;
};
```

### Banners

#### For one user

```js
import { Banner } from "@trycourier/client-graphql";
const bannerApi = Banner({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET", //optional
});
const getBanners = async (params?: { tags?: string[], locale?: string }) => {
  const myBanners = await bannerApi.getBanners(params);
  return myBanners;
};
```

#### With JWT (Supports multiple users)

```js
import { Banner } from "@trycourier/client-graphql";
const bannerApi = Banner({ authorization: "MY JWT TOKEN" });
const getBanners = async (params?: { tags?: string[], locale?: string }) => {
  const myBanners = await bannerApi.getBanners(params);
  return myBanners;
};
```
