global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Inbox from "../index";
import pkg from "../../../package.json";

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
        "https://inbox.courier.com/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxMessages($params: FilterParamsInput, $pinnedParams: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  pinned: messages(params: $pinnedParams, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      actions(version: 2) {\\\\n        background_color\\\\n        data\\\\n        content\\\\n        href\\\\n        style\\\\n        __typename\\\\n      }\\\\n      archived\\\\n      created\\\\n      data\\\\n      icon\\\\n      messageId\\\\n      opened\\\\n      pinned {\\\\n        slotId\\\\n        __typename\\\\n      }\\\\n      preview\\\\n      read\\\\n      icon\\\\n      tags\\\\n      title\\\\n      trackingIds {\\\\n        openTrackingId\\\\n        archiveTrackingId\\\\n        clickTrackingId\\\\n        deliverTrackingId\\\\n        readTrackingId\\\\n        unreadTrackingId\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      actions(version: 2) {\\\\n        background_color\\\\n        data\\\\n        content\\\\n        href\\\\n        style\\\\n        __typename\\\\n      }\\\\n      archived\\\\n      created\\\\n      data\\\\n      icon\\\\n      messageId\\\\n      opened\\\\n      pinned {\\\\n        slotId\\\\n        __typename\\\\n      }\\\\n      preview\\\\n      read\\\\n      icon\\\\n      tags\\\\n      title\\\\n      trackingIds {\\\\n        openTrackingId\\\\n        archiveTrackingId\\\\n        clickTrackingId\\\\n        deliverTrackingId\\\\n        readTrackingId\\\\n        unreadTrackingId\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxMessages\\",\\"variables\\":{\\"params\\":{\\"pinned\\":false},\\"pinnedParams\\":{\\"pinned\\":true}}}",
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

    await inboxApi.getMessages({
      status: "read",
      tags: ["abc", "123"],
    });

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "https://inbox.courier.com/q",
        Object {
          "body": "{\\"query\\":\\"query GetInboxMessages($params: FilterParamsInput, $pinnedParams: FilterParamsInput, $limit: Int = 10, $after: String) {\\\\n  pinned: messages(params: $pinnedParams, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      actions(version: 2) {\\\\n        background_color\\\\n        data\\\\n        content\\\\n        href\\\\n        style\\\\n        __typename\\\\n      }\\\\n      archived\\\\n      created\\\\n      data\\\\n      icon\\\\n      messageId\\\\n      opened\\\\n      pinned {\\\\n        slotId\\\\n        __typename\\\\n      }\\\\n      preview\\\\n      read\\\\n      icon\\\\n      tags\\\\n      title\\\\n      trackingIds {\\\\n        openTrackingId\\\\n        archiveTrackingId\\\\n        clickTrackingId\\\\n        deliverTrackingId\\\\n        readTrackingId\\\\n        unreadTrackingId\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n  messages(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      actions(version: 2) {\\\\n        background_color\\\\n        data\\\\n        content\\\\n        href\\\\n        style\\\\n        __typename\\\\n      }\\\\n      archived\\\\n      created\\\\n      data\\\\n      icon\\\\n      messageId\\\\n      opened\\\\n      pinned {\\\\n        slotId\\\\n        __typename\\\\n      }\\\\n      preview\\\\n      read\\\\n      icon\\\\n      tags\\\\n      title\\\\n      trackingIds {\\\\n        openTrackingId\\\\n        archiveTrackingId\\\\n        clickTrackingId\\\\n        deliverTrackingId\\\\n        readTrackingId\\\\n        unreadTrackingId\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetInboxMessages\\",\\"variables\\":{\\"params\\":{\\"status\\":\\"read\\",\\"tags\\":[\\"abc\\",\\"123\\"],\\"pinned\\":false},\\"pinnedParams\\":{\\"status\\":\\"read\\",\\"tags\\":[\\"abc\\",\\"123\\"],\\"pinned\\":true}}}",
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
