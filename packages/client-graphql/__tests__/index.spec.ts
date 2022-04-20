global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Messages from "../src/messages";
import Banner from "../src/banner";

describe("getMessages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should work without params", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await messagesApi.getMessages();
    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetMessages($params: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      read\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          readTrackingId\\\\n          unreadTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetMessages\\",\\"variables\\":{}}",
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
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await messagesApi.getMessages({
      tags: ["MOCK_TAG"],
      isRead: true,
    });

    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetMessages($params: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      read\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          readTrackingId\\\\n          unreadTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetMessages\\",\\"variables\\":{\\"params\\":{\\"tags\\":[\\"MOCK_TAG\\"],\\"isRead\\":true}}}",
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
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await messagesApi.getMessageCount();
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
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const messagesApi = Messages({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await messagesApi.getMessageCount({
      tags: ["MOCK_TAG"],
      isRead: false,
    });

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

describe("test123", () => {
  test("works", async () => {
    const bannerApi = Banner({
      apiUrl: "https://rubmz24skk.execute-api.us-east-1.amazonaws.com/dev",
      clientKey: "MDE0ZDMwZDYtMjlkMS00ZTI1LTk0MTctNzQ1NTljN2I1YTk2",
      userId: "70f6a4f4-2907-4518-b8f3-b9cfab224764",
    });

    const result = await bannerApi.getBanner();

    console.log("result", result);
  });
});
