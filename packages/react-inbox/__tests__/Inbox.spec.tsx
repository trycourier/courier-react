import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import React from "react";
import { Inbox, CourierProvider } from "../src";
import { InboxProps } from "../src/types";

function renderInboxComponent(props?: Partial<InboxProps>) {
  const defaultProps: InboxProps = {
    title: "Inbox",
  };

  return render(
    <CourierProvider>
      <MockedProvider>
        <Inbox {...defaultProps} {...props} />
      </MockedProvider>
    </CourierProvider>
  );
}

describe("<Inbox />", () => {
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

  it("should inbox when mouse hovers the bell", async () => {
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
