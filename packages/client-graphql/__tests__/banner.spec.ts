global.fetch = jest.fn();
require("isomorphic-fetch");

const fetchMock = global.fetch as jest.Mock;
import Banner from "../src/banner";

describe("banner", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates query correctly with hmac", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const bannerApi = Banner({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    await bannerApi.getBanners();

    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String) {\\\\n  banners(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetBanners\\",\\"variables\\":{}}",
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

  test("creates query correctly with jwt", async () => {
    fetchMock.mockImplementation(() => Promise.resolve([]));
    const bannerApi = Banner({
      authorization: "abc123",
    });

    await bannerApi.getBanners({
      from: 123,
      locale: "eu-fr",
      tags: ["abc"],
    });

    expect(fetchMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String) {\\\\n  banners(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      messageId\\\\n      created\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        trackingIds {\\\\n          clickTrackingId\\\\n          deliverTrackingId\\\\n          __typename\\\\n        }\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetBanners\\",\\"variables\\":{\\"params\\":{\\"from\\":123,\\"locale\\":\\"eu-fr\\",\\"tags\\":[\\"abc\\"]}}}",
        "headers": Object {
          "authorization": "abc123",
          "content-type": "application/json",
        },
        "method": "POST",
        "signal": AbortSignal {},
      }
    `);
  });
});
