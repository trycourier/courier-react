import React from "react";
import { render } from "@testing-library/react";
import { Inbox, CourierProvider } from "../src";
import { InboxProps } from "../src/types";

export const renderInboxComponent = (props?: Partial<InboxProps>) => {
  return render(
    <CourierProvider clientKey="1232132123" userId="12312312">
      <Inbox {...props} />
    </CourierProvider>
  );
};
