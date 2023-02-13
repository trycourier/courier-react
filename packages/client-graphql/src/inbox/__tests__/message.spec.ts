global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Inbox from "../index";
import pkg from "../../../package.json";

describe("getMessage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getMessage("mockMessageId");
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxMessage($messageId: String!) {\\\\n  message(messageId: $messageId) {\\\\n    created\\\\n    messageId\\\\n    read\\\\n    content {\\\\n      html\\\\n      actions {\\\\n        background_color\\\\n        content\\\\n        href\\\\n        style\\\\n        __typename\\\\n      }\\\\n      elemental {\\\\n        ... on TextElement {\\\\n          type\\\\n          content\\\\n          __typename\\\\n        }\\\\n        ... on ActionElement {\\\\n          type\\\\n          content\\\\n          href\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxMessage\\",\\"variables\\":{\\"messageId\\":\\"mockMessageId\\"}}",
          "headers": Object {
            "content-type": "application/json",
            "x-courier-client-key": "CLIENT_KEY",
            "x-courier-client-platform": "web",
            "x-courier-client-version": "${pkg.version}",
            "x-courier-user-id": "USER_ID",
          },
          "method": "POST",
          "signal": AbortSignal {},
        },
      ]
    `);
  });
});
