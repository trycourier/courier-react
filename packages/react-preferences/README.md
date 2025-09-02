## 🚨 THIS PROJECT HAS MOVED 🚨

**This repository is deprecated. For the latest features, bug fixes, and more, visit [Courier React SDK documentation](https://www.courier.com/docs/sdk-libraries/courier-react-web) or upgrade using the [v8 Migration Guide](https://www.courier.com/docs/sdk-libraries/courier-react-v8-migration-guide).**

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [React Preferences Overview](#react-preferences-overview)
  - [Installation](#installation)
- [Easy Usage](#easy-usage)
- [Limitations](#limitations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0overviewmd"></a>

# [React Preferences Overview](#overview)

A set of UI components for allowing your end users to manage their preferences. These set of React components supports Branding, Tenants, Draft, Sections, Topics, Digest Schedules, Status (OPTED_IN, OPTED_OUT, and REQUIRED), and Preferred Channels.

- If you're looking to implement Preferences with your own custom UI in React, we encourage you to look at [react-hooks](../react-hooks/README.md) and use this repository's components as inspiration.
- If you're looking for a turnkey preferences page on other web frameworks, you could use our [hosted preference page](https://www.courier.com/docs/platform/preferences/preference-center/hosted-page/) or check out our [Components repository](../components/README.md) for self-hosting

![self-hosted preference page](example.com-preferences.png)

## [Installation](#installation)

```
yarn add @trycourier/react-provider @trycourier/react-preferences
```

Note: Depending on your React version, if you get a `Cannot find module "prop-types"` error, you will need to `yarn add prop-types`.

<a name="1easy-usagemd"></a>

# [Easy Usage](#easy-usage)

```jsx
import React from "react";
import { Footer, Header, PreferencesV4 } from "@trycourier/react-preferences";
import { CourierProvider } from "@trycourier/react-provider";

const PreferencePage: React.FunctionComponent<{
  tenantId?: string,
  draft?: boolean,
}> = ({ tenantId, draft = false }) => {
  return (
    <CourierProvider
      // see @trycourier/react-provider for other authorization schemes and props
      clientKey="..."
      userId=".."
    >
      <Header />
      <PreferencesV4 tenantId={tenantId} draft={draft} />
      <Footer />
    </CourierProvider>
  );
};

export default PreferencePage;
```

You can also check out our implementation of the [self-hosted Components](../components/src/components/PreferencePage.tsx)

<a name="2limitationsmd"></a>

# [Limitations](#limitations)

This repository is not currently fully customizable; it has opinions on components (checkboxes and radio buttons), margins, paddings, font height, gaps, etc. It does adhere to configured Brands colors and logos.
