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

    await inboxApi.markRead("mockMessageId");
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"mutation TrackEvent($messageId: String!) {\\\\n  read(messageId: $messageId)\\\\n}\\\\n\\",\\"operationName\\":\\"TrackEvent\\",\\"variables\\":{\\"messageId\\":\\"mockMessageId\\"}}",
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

  test("markUnread", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));

    await inboxApi.markUnread("mockMessageId");
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"mutation TrackEvent($messageId: String!) {\\\\n  unread(messageId: $messageId)\\\\n}\\\\n\\",\\"operationName\\":\\"TrackEvent\\",\\"variables\\":{\\"messageId\\":\\"mockMessageId\\"}}",
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

  test("markArchive", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));

    await inboxApi.markArchive("mockMessageId");
    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
        Object {
          "body": "{\\"query\\":\\"mutation TrackEvent($messageId: String!) {\\\\n  archive(messageId: $messageId)\\\\n}\\\\n\\",\\"operationName\\":\\"TrackEvent\\",\\"variables\\":{\\"messageId\\":\\"mockMessageId\\"}}",
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
