global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Inbox from "../index";
import pkg from "../../../package.json";

describe("getInboxCount", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getInboxCount();
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxCount($params: FilterParamsInput) {\\\\n  count(params: $params)\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxCount\\",\\"variables\\":{\\"params\\":{}}}",
          "headers": Object {
            "content-type": "application/json",
            "x-courier-client-key": "CLIENT_KEY",
            "x-courier-client-version": "${pkg.version}",
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

    await inboxApi.getInboxCount({
      status: "read",
      tags: ["abc", "123"],
    });

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxCount($params: FilterParamsInput) {\\\\n  count(params: $params)\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxCount\\",\\"variables\\":{\\"params\\":{\\"status\\":\\"read\\",\\"tags\\":[\\"abc\\",\\"123\\"]}}}",
          "headers": Object {
            "content-type": "application/json",
            "x-courier-client-key": "CLIENT_KEY",
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
