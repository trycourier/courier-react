global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Inbox from "../src/inbox";
import pkg from "../package.json";

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
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox?",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
      },
    ]);
  });

  test("should work with params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getMessages({
      next: "abc123",
      tags: ["foo", "bar"],
      status: "read",
    });
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox?next=abc123&status=read&tags=foo%2Cbar",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
      },
    ]);
  });
});

describe("getMessageCount", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getMessageCount();
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/count?",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
      },
    ]);
  });

  test("should work with params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.getMessageCount({
      tags: ["foo", "bar"],
      status: "read",
    });
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/count?status=read&tags=foo%2Cbar",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
      },
    ]);
  });
});

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
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/mockMessageId",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
      },
    ]);
  });
});

describe("trackEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should mark read", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.markRead("mockMessageId");
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/mockMessageId/event/read",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
        method: "post",
      },
    ]);
  });

  test("should mark unread", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.markUnread("mockMessageId");
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/mockMessageId/event/unread",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
        method: "post",
      },
    ]);
  });

  test("should mark archived", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.markArchived("mockMessageId");
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/mockMessageId/event/archive",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",

          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
        method: "post",
      },
    ]);
  });

  test("should mark all read", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const inboxApi = Inbox({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await inboxApi.markAllRead();
    expect(fetchMock.mock.calls[0]).toEqual([
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/inbox/mark-all-read",
      {
        headers: {
          "x-courier-client-key": "CLIENT_KEY",

          "x-courier-client-version": pkg.version,
          "x-courier-user-id": "USER_ID",
        },
        method: "post",
      },
    ]);
  });
});
