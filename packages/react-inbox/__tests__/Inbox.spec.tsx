import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import React from "react";
import { Inbox, CourierProvider } from "../src";
import { InboxProps } from "../src/types";

import fetchMock from "fetch-mock";

function renderInboxComponent(props?: Partial<InboxProps>) {
  const defaultProps: InboxProps = {
    title: "Inbox",
  };

  return render(
    <CourierProvider clientKey="1232132123" userId="12312312">
      <Inbox {...defaultProps} {...props} />
    </CourierProvider>
  );
}

describe("<Inbox />", () => {
  beforeEach(() => {
    fetchMock.post("https://api.courier.com/client/q", {
      data: {
        messages: {
          nodes: [
            {
              id: "123",
              messageId: "1-6055153c-c0af468a3ebe8cb79665f556",
              created: "2021-03-19T21:18:52.271Z",
              content: {
                title: "Template Published",
                body: "Weekly Check-In was recently published",
                data: {
                  clickAction:
                    "/designer/notifications/BFD3HKDEZR4478MBV5ZTGHWXXEDP",
                  tenantId: "7aff2747-d1bb-4f47-9476-3eae1646ba02",
                  triggeredBy: "Google_103278594813491371949",
                },
                __typename: "Content",
              },
              __typename: "Messages",
            },
          ],
        },
      },
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("should throw an error without CourierProvider", () => {
    try {
      render(<Inbox />);
    } catch (ex) {
      expect(String(ex)).toBe("Error: Missing Courier Provider");
    }
  });

  it("should render custom icon", () => {
    const { container } = renderInboxComponent({
      renderIcon: () => <div id="test-123">Hello World</div>,
    });

    const test123 = container.querySelector("#test-123");
    expect(test123).toBeVisible();
  });

  it("should render bell icon", () => {
    const { container } = renderInboxComponent();
    const bellSvg = container.querySelector("[data-testid=bell-svg]");
    expect(bellSvg).toBeVisible();
  });

  it("should inbox when mouse clicks the bell", async () => {
    renderInboxComponent();
    const bellSvg = screen.getByTestId("bell-svg");

    if (!bellSvg) {
      throw new Error("Missing Bell");
    }

    fireEvent.click(bellSvg, { bubbles: true });
    await waitFor(() => screen.getByTestId("messages"));
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
