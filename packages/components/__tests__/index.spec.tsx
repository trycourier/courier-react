require("isomorphic-fetch");
import "@testing-library/jest-dom";
import WS from "jest-websocket-mock";

import { CourierProvider } from "@trycourier/react-provider";
import { CourierComponents } from "../src/components";

import * as React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { graphql, rest } from "msw";
import { setupServer } from "msw/node";
import { IInboxMessagePreview } from "@trycourier/core";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockGraphMessage: IInboxMessagePreview = {
  type: "message",
  messageId: "mockMessageId",
  created: new Date().toISOString(),
  title: "mockTitle",
  preview: "mockBody",
};

const server = setupServer(
  rest.get("https://inbox.courier.com/", (_, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post("https://inbox.courier.com/", (_, res, ctx) => {
    return res(ctx.json({}));
  }),
  graphql.query("GetInboxCount", (_, res, ctx) => {
    return res(
      ctx.data({
        count: 0,
      })
    );
  }),
  graphql.query("GetInboxMessages", (_, res, ctx) => {
    return res(
      ctx.data({
        messages: {
          nodes: [],
        },
      })
    );
  }),
  graphql.query("GetMessageLists", (_, res, ctx) => {
    return res(
      ctx.data({
        unread: {
          messages: "mockNodes0",
        },
        tagged: {
          messages: "mockNodes1",
          startCursor: "mockStartCursor",
        },
      })
    );
  }),
  graphql.query("GetRecipientPreferences", (_, res, ctx) => {
    return res(
      ctx.data({
        recipientPreferences: {
          nodes: [],
        },
      })
    );
  }),
  graphql.query("GetInAppBrand", (_, res, ctx) => {
    return res(ctx.data({}));
  })
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "courier-inbox": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

beforeAll(() => {
  new WS("ws://localhost:1234");
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  WS.clean();
  server.close();
});

test("will render an inbox and can change labels", async () => {
  const inbox = document.createElement("courier-inbox");
  document.body.appendChild(inbox);
  render(
    <CourierProvider
      clientKey="MOCK_CLIENT_KEY"
      userId="MOCK_USER_ID"
      wsOptions={{
        url: "ws://localhost:1234",
      }}
    >
      <CourierComponents />
    </CourierProvider>
  );

  await waitFor(() => {
    return expect(screen.getByTestId("bell")).toBeTruthy();
  });

  act(() => {
    fireEvent.click(screen.getByTestId("bell"));
  });

  const noMessagesElement = await screen.findByText("You’re all caught up");

  expect(noMessagesElement).toBeInTheDocument();

  act(() => {
    (window as any).courier.inbox.setConfig({
      labels: {
        emptyState: "NO MESSAGES",
      },
    });
  });

  expect(await screen.findByText("NO MESSAGES")).toBeInTheDocument();
});

test("will render nothing and then render an inbox when the element is inserted", async () => {
  document.body.innerHTML = "";
  act(() => {
    (window as any).courierConfig = {
      enableMutationObserver: true,
    };
  });
  render(
    <CourierProvider
      clientKey="MOCK_CLIENT_KEY"
      userId="MOCK_USER_ID"
      wsOptions={{
        url: "ws://localhost:1234",
      }}
    >
      <CourierComponents />
    </CourierProvider>
  );

  const inbox = document.createElement("courier-inbox");
  document.body.appendChild(inbox);

  act(() => {
    inbox.setAttribute("is-open", "true");
  });

  const noMessagesElement = await screen.findByText("You’re all caught up");

  expect(noMessagesElement).toBeInTheDocument();

  act(() => {
    inbox.setAttribute(
      "labels",
      JSON.stringify({
        emptyState: "NO MESSAGES",
      })
    );
  });

  await wait(100);

  expect(await screen.findByText("NO MESSAGES")).toBeInTheDocument();
});

test("will support onEvent to listen for events on the window", async (done) => {
  server.use(
    graphql.query("GetInboxMessages", (_, res, ctx) => {
      return res(
        ctx.data({
          messages: {
            nodes: [mockGraphMessage],
          },
        })
      );
    })
  );

  act(() => {
    (window as any).courierConfig = {
      components: {
        inbox: {
          onEvent: (params) => {
            expect(params).toEqual({
              messageId: mockGraphMessage.messageId,
              message: mockGraphMessage,
              event: "read",
            });
            done();
          },
        },
      },
    };
  });

  const inbox = document.createElement("courier-inbox");
  document.body.appendChild(inbox);

  render(
    <CourierProvider
      clientKey="MOCK_CLIENT_KEY"
      userId="MOCK_USER_ID"
      wsOptions={{
        url: "ws://localhost:1234",
      }}
    >
      <CourierComponents />
    </CourierProvider>
  );

  await wait(100);
  fireEvent.click(await screen.findByTitle("Mark as Read"));
});
