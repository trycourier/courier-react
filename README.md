## What is `courier-react`?

This repository, also called **In-App**, is a set of features and components that can work inside our customers websites. Courier is a powerful application but integrating all of the features into your frontend manually can be overwhelming and time consuming. This is where In-App steps up and can superpower your application by providing Realtime Messaging (Toast), an Inbox, Notification Preferences, and many more coming soon!

## Embedded Integration

Want to use packages with other frameworks/libraries like _angular_ or _vue_? Check out how to do [Embedded Integration](https://www.courier.com/docs/guides/providers/in-app/courier-push/#embedded-integration)

## 6.0 Release

We've cleaned up a bunch of stale code that isn't being used anymore. We no longer export "Messages" from client-graphql and only support "Inbox" as a datasource.

Typings have also been fixed for client-graphql and useCourier hooks

Styled Components is now a peer dependency

## 2.0 and 3.0 Releases

We've recently created both 2.X and 3.X releases related to this monorepository. This is because we've migrated to a new simpler, streamlined style for our components and there are breaking changes with _props_ and _api_. Below is a short description of each of our versions:

### 1.X

The 1.X versions will consist of our old UX, and use our legacy APIs. If you are a _free_ tier customer your data retention on 1.X will be limited to 30 days and subject to change.

### 2.X

We introduced a new _theme_ that makes the UX smaller and simplifies the UX. Some of the notable changes are:

1. Single list design - no more tabs
2. Entire message is clickable vs having action buttons
3. Make all actions (read/unread/archive) displayable without having to click into a menu
4. Expose "archive" as an action

The 2.X version will now default to this new theme and will utilize our new API that does not have the same data retention as the legacy API.

You can still access the 1.X designs by passing theme.name === "classic" to the Inbox component

### 3.X

We created a separate breaking change branch to make sure our bundles are small and optimized. We didn't want to bundle any uneccesary code to support the "classic" theme so 3.0 has removed all the deprecated code. There are breaking changes and a

- [Inbox migration guide](https://github.com/trycourier/courier-react/tree/main/packages/react-inbox/README.md)
- [Toast migration guide](https://github.com/trycourier/courier-react/tree/main/packages/react-toast/docs/1.overview.md)
- [Hooks migration guide](https://github.com/trycourier/courier-react/tree/main/packages/react-hooks/README.md)

### 4.x

Version 4 adds support for [Tenants](https://www.courier.com/docs/reference/tenants/), which is useful for modeling multi-tenant notification environments. Version 4 makes a single breaking change from Version 3, Accounts (Beta) was renamed to Tenants. If you were not using Accounts (Beta), you can safely upgrade from v3 to v4 without making code changes. Otherwise, see migration guide below.

#### Migration Guide

1. In CourierProvider, change `accountId` to `tenantId`.
2. Thats all.

**Before:**

```tsx
<CourierProvider
  accountId={"YOUR_ACCOUNT_ID"}
  clientKey={props.clientKey}
  userId={props.userId}
  apiUrl={props.apiURL}
  wsOptions={{
    url: props.wsURL,
  }}
  authorization={props.authorizationToken}
>
  {props.children}
</CourierProvider>
```

**After:**

```tsx
<CourierProvider
  tenantId={"YOUR_TENANT_ID"}
  clientKey={props.clientKey}
  userId={props.userId}
  apiUrl={props.apiURL}
  wsOptions={{
    url: props.wsURL,
  }}
  authorization={props.authorizationToken}
>
  {props.children}
</CourierProvider>
```

**Full Changelog**: https://github.com/trycourier/courier-react/compare/v3.16.0...v4.0.0

## Table of Contents

1. [Contributing](https://github.com/trycourier/courier-react/tree/main/CONTRIBUTING.md)
1. [Packages](#packages)

### Packages:

[components](https://github.com/trycourier/courier-react/tree/main/packages/components)

This package imports the other react components and bundles them up using `webpack` and `preact` to create a bundle that can be used to render all of our components in a frontend that does NOT use React.

---

[react-provider](https://github.com/trycourier/courier-react/tree/main/packages/react-provider)

This package exports a component called `CourierProvider` which creates a [context](https://reactjs.org/docs/context.html) object that is required for the following packages.

---

[react-toast](https://github.com/trycourier/courier-react/tree/main/packages/react-toast)

`Toast` is a non modal, component used to display brief, optional-expiring windows of information to a user. This can be integrated with a `push` provider or can be triggered manually.

---

[react-inbox](https://github.com/trycourier/courier-react/tree/main/packages/react-inbox)

`Inbox` is a component used to display a history of `read` and `unread` messages to a user. If we send a message to a user when they are not logged in, or if they didn't interact with the message before it disappeared, we also have an Inbox to show the history of messages received.

---

[react-hooks](https://github.com/trycourier/courier-react/tree/main/packages/react-hooks)

`hooks` that can be used to build your own inbox or interact with other parts of Courier.

- useInbox
- usePreferenes

---

[client-graphql](https://github.com/trycourier/courier-react/tree/main/packages/client-graphql)

GraphQL library that interacts with Courier's backend

---

[react-brand-designer](https://github.com/trycourier/courier-react/tree/main/packages/react-brand-designer)

The "React Brand Designer" package provides components with a slick UI for branding notifications
delivered with Courier. This enables your own users to personalize their brand-able notifications
like emails without leaving your app or site.

---

[types](https://github.com/trycourier/courier-react/tree/main/packages/types)

Utility package to share common Typescript types and interfaces shared between packages

---

[storybook](https://github.com/trycourier/courier-react/tree/main/packages/storybook)

Our development environment. This package depends on all the other packages and imports them into a storybook instance. This allows us to develop in an isolated environment.

---

---
