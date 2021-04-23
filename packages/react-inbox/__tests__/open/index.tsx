import { renderInboxComponent } from "../helpers";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import fetchMock from "fetch-mock";
import { MESSAGES } from "../../__mocks__/api/messages";

describe("Should test inbox component after opened", () => {
  beforeEach(() => {
    fetchMock.post("https://api.courier.com/client/q", MESSAGES);
  });

  afterEach(() => {
    fetchMock.reset();
  });
  it("should show inbox when mouse clicks the bell", async () => {
    renderInboxComponent();
    const bellSvg = screen.getByTestId("bell-svg");

    if (!bellSvg) {
      throw new Error("Missing Bell");
    }

    fireEvent.click(bellSvg, { bubbles: true });
    await waitFor(() => screen.getByTestId("messages"));
    expect(screen.getByTestId("header")).toBeInTheDocument();
    await act(() => Promise.resolve());
  });
});
