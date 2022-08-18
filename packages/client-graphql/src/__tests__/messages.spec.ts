global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Messages from "../messages";

describe("getMessages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          data: {
            messages: {
              nodes: "mockMessages",
              pageInfo: {
                startCursor: "mockStartCursor",
              },
            },
          },
        }),
      })
    );

    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await messagesApi.getMessages();
    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetMessages($params: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      read\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          archiveTrackingId\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          readTrackingId\\\\n          unreadTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetMessages\\",\\"variables\\":{\\"params\\":{}}}",
        "headers": Object {
          "content-type": "application/json",
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-user-id": "USER_ID",
        },
        "method": "POST",
        "signal": AbortSignal {},
      }
    `);
  });

  test("should work with params", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          data: {
            messages: {
              nodes: "mockMessages",
              pageInfo: {
                startCursor: "mockStartCursor",
              },
            },
          },
        }),
      })
    );
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    const response = await messagesApi.getMessages(
      {
        tags: ["MOCK_TAG"],
        isRead: true,
        limit: 100,
      },
      "abc123"
    );

    expect(response).toEqual({
      appendMessages: true,
      messages: "mockMessages",
      startCursor: "mockStartCursor",
    });

    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetMessages($params: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      read\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          archiveTrackingId\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          readTrackingId\\\\n          unreadTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetMessages\\",\\"variables\\":{\\"after\\":\\"abc123\\",\\"limit\\":100,\\"params\\":{\\"tags\\":[\\"MOCK_TAG\\"],\\"isRead\\":true}}}",
        "headers": Object {
          "content-type": "application/json",
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-user-id": "USER_ID",
        },
        "method": "POST",
        "signal": AbortSignal {},
      }
    `);
  });
});

describe("getMessageLists", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should do nothing without params", async () => {
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await messagesApi.getMessageLists();
    expect(fetchMock.mock.calls.length).toBe(0);
  });

  test("should construct a query for x tabs", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          data: {
            unread: {
              nodes: "mockNodes0",
            },
            tagged: {
              nodes: "mockNodes1",
              pageInfo: {
                startCursor: "mockStartCursor",
              },
            },
          },
        }),
      })
    );

    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    const response = await messagesApi.getMessageLists([
      {
        id: "unread",
        filters: {
          isRead: false,
        },
      },
      {
        id: "tagged",
        filters: {
          tags: ["abc", "123"],
        },
      },
    ]);

    expect(response).toEqual({
      unread: {
        messages: "mockNodes0",
      },
      tagged: {
        messages: "mockNodes1",
        startCursor: "mockStartCursor",
      },
    });

    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetMessageLists($unreadParams: FilterParamsInput, $taggedParams: FilterParamsInput, $limit: Int = 10) {\\\\n  unread: messages(params: $unreadParams, limit: $limit) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      read\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          archiveTrackingId\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          readTrackingId\\\\n          unreadTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n  tagged: messages(params: $taggedParams, limit: $limit) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      read\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          archiveTrackingId\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          readTrackingId\\\\n          unreadTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetMessageLists\\",\\"variables\\":{\\"unreadParams\\":{\\"isRead\\":false},\\"taggedParams\\":{\\"tags\\":[\\"abc\\",\\"123\\"]},\\"limit\\":10}}",
        "headers": Object {
          "content-type": "application/json",
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-user-id": "USER_ID",
        },
        "method": "POST",
        "signal": AbortSignal {},
      }
    `);
  });
});

describe("getMessageCount", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          data: {
            messageCount: 100,
          },
        }),
      })
    );
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    const response = await messagesApi.getMessageCount();
    expect(response).toBe(100);
    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query MessageCount($params: FilterParamsInput) {\\\\n  messageCount(params: $params)\\\\n}\\\\n\\",\\"operationName\\":\\"MessageCount\\",\\"variables\\":{}}",
        "headers": Object {
          "content-type": "application/json",
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-user-id": "USER_ID",
        },
        "method": "POST",
        "signal": AbortSignal {},
      }
    `);
  });

  test("should work with params", async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          data: {
            messageCount: 50,
          },
        }),
      })
    );
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    const response = await messagesApi.getMessageCount({
      tags: ["MOCK_TAG"],
      isRead: false,
    });

    expect(response).toBe(50);

    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query MessageCount($params: FilterParamsInput) {\\\\n  messageCount(params: $params)\\\\n}\\\\n\\",\\"operationName\\":\\"MessageCount\\",\\"variables\\":{\\"params\\":{\\"tags\\":[\\"MOCK_TAG\\"],\\"isRead\\":false}}}",
        "headers": Object {
          "content-type": "application/json",
          "x-courier-client-key": "CLIENT_KEY",
          "x-courier-user-id": "USER_ID",
        },
        "method": "POST",
        "signal": AbortSignal {},
      }
    `);
  });
});
