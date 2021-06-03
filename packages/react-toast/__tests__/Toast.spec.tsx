import React from "react";
import { MESSAGES } from "../__mocks__/api/messages";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Toast, ToastProvider, useToast } from "../src";
import fetchMock from "fetch-mock";

jest.mock("styled-components", () => {
  const styled = jest.requireActual("styled-components");
  styled.createGlobalStyle = () => () => "Global Style";
  return styled;
});

describe("<Toast />", () => {
  beforeEach(() => {
    fetchMock.post("https://api.courier.com/client/q", MESSAGES);
  });
  afterEach(() => {
    fetchMock.reset();
  });
  it("should throw an error if missing ICourierContext", () => {
    expect(() => {
      render(<Toast />);
    }).toThrow("Missing Courier Provider");
  });
});

const title = "Your notification has been sent";
const body = "Click here to view more details";
const icon = "https://app.courier.com/static/favicon/favicon-32x32.png";

function Component({ onClick }) {
  const [toast] = useToast();
  const notification = {
    title,
    body,
    icon,
    onClick,
    data: {
      clickAction: "https://test",
    },
  };
  return <button onClick={() => toast(notification)}>Show Toast</button>;
}

describe("<ToastProvider />", () => {
  beforeEach(() => {
    fetchMock.post("https://api.courier.com/client/q", MESSAGES);
  });
  afterEach(() => {
    fetchMock.reset();
  });
  it("should render toast component on click", async () => {
    const onClick = jest.fn();

    render(
      <ToastProvider>
        <Component onClick={onClick} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Show Toast"));
    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(body)).toBeInTheDocument();
      expect(screen.getByTestId("dismiss")).toBeInTheDocument();
      expect(screen.getByTestId("action-0")).toBeInTheDocument();
      expect(screen.getByTestId("message-icon").getAttribute("src")).toBe(icon);
    });
  });
});
