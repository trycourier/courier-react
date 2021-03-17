import React from "react";

import { Inbox } from "@trycourier/react-inbox";
import { CourierProvider } from "@trycourier/react-provider";

export default {
  title: "Inbox/GraphQL",
  component: Inbox,
  argTypes: {},
  args: {},
};

export function Default() {
  return (
    <CourierProvider
      clientKey="ZDRiMTViNmMtODdmZi00OWMzLWI5YTgtYmU5NTc3YTRlM2Y1"
      userId="3b17362c-0c91-4fcd-a829-885a2343eb67"
    >
      <Inbox title="Notifications" />
    </CourierProvider>
  );
}
