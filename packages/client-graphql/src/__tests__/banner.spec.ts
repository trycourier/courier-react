global.fetch = jest.fn();

const fetchMock = global.fetch as jest.Mock;
import Banner from "../banner";

describe("banner", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          data: {
            banners: {
              nodes: "mockBanners",
              pageInfo: {
                startCursor: "mockStartCursor",
              },
            },
          },
        }),
      })
    );
  });

  test("creates query correctly with hmac", async () => {
    const bannerApi = Banner({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    const response = await bannerApi.getBanners();
    expect(response).toEqual({
      banners: "mockBanners",
      startCursor: "mockStartCursor",
    });

    const thisCall = fetchMock.mock.calls[0][1];
    expect(thisCall.body).toMatchInlineSnapshot(
      `"{\\"query\\":\\"query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String) {\\\\n  banners(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      userId\\\\n      messageId\\\\n      created\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetBanners\\",\\"variables\\":{\\"params\\":{}}}"`
    );
    expect(thisCall.headers).toEqual({
      "content-type": "application/json",
      "x-courier-client-key": "CLIENT_KEY",
      "x-courier-user-id": "USER_ID",
    });
    expect(thisCall.method).toBe("POST");
  });

  test("creates query correctly with limit", async () => {
    const bannerApi = Banner({
      clientKey: "CLIENT_KEY",
      userId: "USER_ID",
    });

    const response = await bannerApi.getBanners({
      limit: 100,
    });

    expect(response).toEqual({
      banners: "mockBanners",
      startCursor: "mockStartCursor",
    });

    const thisCall = fetchMock.mock.calls[0][1];
    expect(thisCall.body).toMatchInlineSnapshot(
      `"{\\"query\\":\\"query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String) {\\\\n  banners(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      userId\\\\n      messageId\\\\n      created\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetBanners\\",\\"variables\\":{\\"limit\\":100,\\"params\\":{}}}"`
    );
  });

  test("creates query correctly with jwt", async () => {
    const bannerApi = Banner({ authorization: "abc123" });

    const response = await bannerApi.getBanners({
      from: 123,
      locale: "eu-fr",
      tags: ["abc"],
    });

    expect(response).toEqual({
      banners: "mockBanners",
      startCursor: "mockStartCursor",
    });

    const thisCall = fetchMock.mock.calls[0][1];
    expect(thisCall.body).toMatchInlineSnapshot(
      `"{\\"query\\":\\"query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String) {\\\\n  banners(params: $params, limit: $limit, after: $after) {\\\\n    totalCount\\\\n    pageInfo {\\\\n      startCursor\\\\n      hasNextPage\\\\n      __typename\\\\n    }\\\\n    nodes {\\\\n      id\\\\n      userId\\\\n      messageId\\\\n      created\\\\n      tags\\\\n      content {\\\\n        title\\\\n        body\\\\n        blocks {\\\\n          ... on TextBlock {\\\\n            type\\\\n            text\\\\n            __typename\\\\n          }\\\\n          ... on ActionBlock {\\\\n            type\\\\n            text\\\\n            url\\\\n            __typename\\\\n          }\\\\n          __typename\\\\n        }\\\\n        data\\\\n        __typename\\\\n      }\\\\n      __typename\\\\n    }\\\\n    __typename\\\\n  }\\\\n}\\\\n\\",\\"operationName\\":\\"GetBanners\\",\\"variables\\":{\\"params\\":{\\"from\\":123,\\"locale\\":\\"eu-fr\\",\\"tags\\":[\\"abc\\"]}}}"`
    );
    expect(thisCall.headers).toEqual({
      authorization: "Bearer abc123",
      "content-type": "application/json",
    });
    expect(thisCall.method).toBe("POST");
  });
});
