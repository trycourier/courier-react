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

### Preferences

You can use our GraphQL endpoints to read and write advanced user preferences and see draft preferences. This API has getRecipientPreferences, getPreferencePage, getDraftPreferencePage, and updateRecipientPreferences methods. You can see the response payloads in action on [User Preference Tester](https://bwebs.github.io/courier-test/window-preferences.html)

```js
import { Preferences } from "@trycourier/client-graphql";
const preferencesApi = Preferences({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET",
});
const getRecipientPreferences = async (tenantId?: string) => {
  const user_preferences = await preferencesApi.getRecipientPreferences(
    tenantId
  );
  return user_preferences;
};
const getPreferencePage = async (tenantId?: string) => {
  const page_with_defaults = await preferencesApi.getPreferencePage(tenantId);
  return page_with_defaults;
};
const getDraftPreferencePage = async (tenantId?: string) => {
  const draft_page_with_defaults = await preferencesApi.getDraftPreferencePage(
    tenantId
  );
  return draft_page_with_defaults;
};
const updateRecipientPreferences = async (
  payload: UpdateRecipientPreferencesPayload
) => {
  const update_preferences = await preferencesApi.updateRecipientPreferences(
    payload
  );
  return update_preferences;
};
```

```ts
interface UpdateRecipientPreferencesPayload {
  templateId: string;
  status: string;
  hasCustomRouting: boolean;
  routingPreferences: Array<string>;
  digestSchedule: string;
  tenantId?: string;
}
```

### Banners

#### For one user

This will instantiate the client required to query the Courier GraphQL. getBanners will grab all banners for that user

```js
import { Banner } from "@trycourier/client-graphql";
const bannerApi = Banner({
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET", //optional
});
const getBanners = async (params?: IGetBannerParams) => {
  const myBanners = await bannerApi.getBanners(params);
  return myBanners;
};
```

#### Archive a banner

The following code will archive the selected banner for that user. After receiving and processing in Courier, getBanners will no longer return the banner. Archiving is an asynchronous process; there will be a slight delay before the banner is removed in the getBanners API call.

```
const config = {
  clientKey: "abc123",
  userId: "@me",
  userSignature: "SUPER_SECRET", //optional
}
const bannerApi = Banner(config);
const eventsApi = Events(config);

const getBanners = async (params?: IGetBannerParams) => {
  const myBanners = await bannerApi.getBanners(params);
  return myBanners;
};
const banners = await getBanner();
await eventsApi.trackEvent(
    banners.content.trackingIds.archiveTrackingId
);
```

#### Banner Params

```typescript
interface IGetBannerParams {
  from?: number;
  limit?: number;
  locale?: string;
  tags?: string[];
  trackingIds?: boolean;
}
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
