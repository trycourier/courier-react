global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Inbox from "../index";

describe("getMessages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getMessages();
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxMessages($params: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      preview\\\\n      messageId\\\\n      read\\\\n      archived\\\\n      created\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxMessages\\",\\"variables\\":{\\"params\\":{}}}",
          "headers": Object {
            "content-type": "application/json",
            "x-courier-client-key": "CLIENT_KEY",
            "x-courier-user-id": "USER_ID",
          },
          "method": "POST",
          "signal": AbortSignal {},
        },
      ]
    `);
  });

  test("should work with params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getMessages({
      status: "read",
      tags: ["abc", "123"],
    });

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxMessages($params: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      preview\\\\n      messageId\\\\n      read\\\\n      archived\\\\n      created\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxMessages\\",\\"variables\\":{\\"params\\":{\\"status\\":\\"read\\",\\"tags\\":[\\"abc\\",\\"123\\"]}}}",
          "headers": Object {
            "content-type": "application/json",
            "x-courier-client-key": "CLIENT_KEY",
            "x-courier-user-id": "USER_ID",
          },
          "method": "POST",
          "signal": AbortSignal {},
        },
      ]
    `);
  });
});
