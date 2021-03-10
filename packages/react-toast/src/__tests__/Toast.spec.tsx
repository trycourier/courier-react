import React from "react";
import {
  render, fireEvent, screen, waitFor,
} from "@testing-library/react";

import {
  Toast, ToastProvider, useToast,
} from "..";

jest.mock("styled-components", () => ({
  __esModule: true,
  ...jest.requireActual("styled-components"),
  createGlobalStyle: () => () => "Global Style",
}));

describe("<Toast />", () => {
  it("should not render toast component", () => {
    const { container } = renderToastComponent();
    const toastComponent = container.querySelector("[data-test-id=crt-toast-container]");
    expect(toastComponent).toBeFalsy();
  });
});

const title = "Your notification has been sent";
const body = "Click here to view more details";
const icon = "https://app.courier.com/static/favicon/favicon-32x32.png";

function Component({ onClick }) {
  const [ toast ] = useToast();
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
    providerRenderer(<Component onClick={onClick} />, {});
    fireEvent.click(screen.getByText("Show Toast"));
    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(body)).toBeInTheDocument();
      expect(screen.getByText("Dismiss")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByTestId("toast-icon").getAttribute("src")).toBe(icon);
    });
  });
});

function renderToastComponent(){
  return render(<Toast />);
}

function providerRenderer(ui, { providerProps, ...renderOptions }: {providerProps?: object}){
  return render(
    <ToastProvider {...providerProps}>{ui}</ToastProvider>,
    renderOptions,
  );
}