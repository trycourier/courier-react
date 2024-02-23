global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Inbox from "../index";
import pkg from "../../../package.json";

describe("trackEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const inboxApi = Inbox({
    clientKey: "CLIENT_KEY",
    userId: "USER_ID",
  });

  test("markRead", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));

    await inboxApi.markAllRead();
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://inbox.courier.com/q",
        Object {
          "body": "{\\"query\\":\\"mutation TrackEvent {\\\\n  markAllRead\\\\n}\\\\n\\",\\"operationName\\":\\"TrackEvent\\",\\"variables\\":{}}",
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
