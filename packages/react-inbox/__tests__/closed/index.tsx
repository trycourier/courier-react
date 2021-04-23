import React from "react";
import { MESSAGES, MESSAGE_COUNT } from "../../__mocks__/api/messages";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderInboxComponent } from "../helpers";
import fetchMock from "fetch-mock";
import { Inbox } from "../../src";

import * as fetchMessages from "../../src/actions/messages";
import { DEFAULT_BRAND } from "../../__mocks__/api/brand";

describe("Test Bell Initial Render", () => {
  beforeEach(() => {
    fetchMock.post("https://api.courier.com/client/q", MESSAGES);
  });
  afterEach(() => {
    fetchMock.reset();
  });

  it("should render bell icon", async () => {
    const { getByTestId } = renderInboxComponent();
    const bellSvg = getByTestId("bell-svg");
    expect(bellSvg).toBeVisible();
  });
  it("should throw an error without CourierProvider", async () => {
    try {
      render(<Inbox />);
    } catch (ex) {
      expect(String(ex)).toBe("Error: Missing Courier Provider");
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
    fetchMock.post("https://api.courier.com/client/q", MESSAGES);
  });
  afterEach(() => {
    fetchMessagesSpy.mockRestore();
    fetchMock.reset();
  });
  it("should test messages are fetched on hover", async () => {
    let getByTestId;
    act(() => {
      const screen = renderInboxComponent();
      getByTestId = screen.getByTestId;
    });

    const bellSvg = getByTestId("bell-svg");
    act(() => {
      fireEvent.mouseOver(bellSvg, { bubbles: true });
    });
    expect(fetchMessagesSpy).toBeCalledTimes(1);
    await act(() => Promise.resolve());
  });
});

describe("Test Bell State", () => {
  beforeEach(() => {
    fetchMock
      .post("https://api.courier.com/client/q", MESSAGES, {
        overwriteRoutes: false,
        matchPartialBody: true,
        body: {
          operationName: "GetMessages",
        },
      })
      .post("https://api.courier.com/client/q", MESSAGE_COUNT, {
        overwriteRoutes: false,
        matchPartialBody: true,
        body: {
          operationName: "MessageCount",
        },
      })
      .post("https://api.courier.com/client/q", DEFAULT_BRAND, {
        overwriteRoutes: false,
        matchPartialBody: true,
        body: {
          operationName: "GetDefaultBrand",
        },
      });
  });
  afterEach(() => {
    fetchMock.reset();
  });
  it("should have a pulse when there are new messages", async () => {
    const screen = renderInboxComponent();
    const getByTestId = screen.getByTestId;
    const bellSvg = getByTestId("bell-svg");
    act(() => {
      fireEvent.mouseOver(bellSvg, { bubbles: true });
    });
    await waitFor(() => {
      return expect(getByTestId("unread-badge")).toBeInTheDocument();
    });
  });
});
