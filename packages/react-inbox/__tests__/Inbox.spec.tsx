import { render } from "@testing-library/react";
import React from "react";
import { Inbox } from "../src";
import { InboxProps } from "../src/types";

describe("<Inbox />", () => {
  it("should show inbox component", () => {
    const { container } = renderInboxComponent();
    const inboxMessages = container.querySelector(
      "[data-test-id=inbox-container]"
    );
    expect(inboxMessages).toBeVisible();
  });

  it("should not show inbox component if indicator prop specified", () => {
    const { container } = renderInboxComponent({
      indicator: true,
    });
    const inboxMessages = container.querySelector(
      "[data-test-id=inbox-container]"
    );
    expect(inboxMessages).not.toBeVisible();
  });
});

function renderInboxComponent(props?: Partial<InboxProps>) {
  const defaultProps: InboxProps = {
    messages: [
      {
        title: "Notification successfully sent",
        body: "Click here to see more",
      },
    ],
    title: "Inbox",
  };
  return render(<Inbox {...defaultProps} {...props} />);
}
