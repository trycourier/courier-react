import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderInboxComponent } from "../helpers";
import { Inbox } from "../../src";
import fetchMock from "fetch-mock";
import MESSAGES from "../../__mocks__/api/messages";
import * as fetchMessages from "../../src/actions/messages";

describe("Test Bell Initial Render", () => {
  beforeEach(() => {
    fetchMock.post("https://api.courier.com/client/q", MESSAGES);
  });

  afterEach(() => {
    fetchMock.reset();
  });
  it("should render bell icon", async () => {
    renderInboxComponent();
    const bellSvg = screen.getByTestId("bell-svg");
    expect(bellSvg).toBeVisible();
    await act(() => Promise.resolve());
  });
  it("should throw an error without CourierProvider", async () => {
    try {
      render(<Inbox />);
    } catch (ex) {
      expect(String(ex)).toBe("Error: Missing Courier Provider");
      await act(() => Promise.resolve());
    }
  });
  it("should render custom icon", async () => {
    const { container } = renderInboxComponent({
      renderIcon: () => <div id="test-123">Hello World</div>,
    });

    const test123 = container.querySelector("#test-123");
    expect(test123).toBeVisible();
    await act(() => Promise.resolve());
  });
});

describe("Test Messages Being Fetched", () => {
  let fetchMessagesSpy;
  beforeEach(() => {
    fetchMessagesSpy = jest.spyOn(fetchMessages, "getMessages");
  });
  it("should test messages are fetched on hover", () => {
    renderInboxComponent();
    const bellSvg = screen.getByTestId("bell-svg");
    fireEvent.mouseOver(bellSvg, { bubbles: true });
    expect(fetchMessagesSpy).toBeCalledTimes(1);
  });
});
