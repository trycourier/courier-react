import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Toast, ToastProvider, useToast } from "../src";

jest.mock("styled-components", () => {
  const styled = jest.requireActual("styled-components");
  styled.createGlobalStyle = () => () => "Global Style";
  return styled;
});

describe("<Toast />", () => {
  it("should throw an error if missing CourierContext", () => {
    expect(() => {
      render(<Toast />)
    }).toThrow('Missing Courier Provider')
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
  };
  return <button onClick={() => toast(notification)}>Show Toast</button>;
}

describe("<ToastProvider />", () => {
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
      expect(screen.getByText("Dismiss")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByTestId("message-icon").getAttribute("src")).toBe(icon);
    });
  });
});
