![GitHub Workflow Status](https://img.shields.io/github/workflow/status/trycourier/courier-react/Test?label=Unit%20Tests)
[![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg?label=Stability)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
[![codecov](https://codecov.io/gh/trycourier/courier-react/branch/main/graph/badge.svg?token=NVTDWY9UH4)](https://codecov.io/gh/trycourier/courier-react)

## What is `courier-react`?

This repository, also called **In-App**, is a set of features and components that can work inside our customers websites. Courier is a powerful application but integrating all of the features into your frontend manually can be overwhelming and time consuming. This is where In-App steps up and can superpower your application by providing Realtime Messaging (Toast), an Inbox, Notification Preferences, and many more coming soon!

## Embedded Integration

Want to use packages with other frameworks/libraries? Check out how to do [Embedded Integration](https://www.courier.com/docs/guides/providers/in-app/courier-push/#embedded-integration)

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
