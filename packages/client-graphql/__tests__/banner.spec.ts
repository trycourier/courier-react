//global.fetch = jest.fn();
require("isomorphic-fetch");

//const fetchMock = global.fetch as jest.Mock;
import Banner from "../src/banner";

describe("banner", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("works", async () => {
    const bannerApi = Banner({
      apiUrl: "https://rubmz24skk.execute-api.us-east-1.amazonaws.com/dev",
      clientKey: "MDE0ZDMwZDYtMjlkMS00ZTI1LTk0MTctNzQ1NTljN2I1YTk2",
      userId: "70f6a4f4-2907-4518-b8f3-b9cfab224764",
    });

    const result = await bannerApi.getBanner();

    console.log("result", JSON.stringify(result, null, 2));

    expect(result).toMatchInlineSnapshot(`
      Object {
        "appendMessages": false,
        "banner": Array [
          Object {
            "__typename": "Messages",
            "content": Object {
              "__typename": "Content",
              "blocks": Array [
                Object {
                  "__typename": "TextBlock",
                  "text": "world",
                  "type": "text",
                },
              ],
              "body": "world
      ",
              "data": null,
              "title": "hello",
              "trackingIds": null,
            },
            "created": "2022-04-19T23:41:58.003Z",
            "id": "eyJpZCI6IjEtNjI1ZjQ4YzUtM2ZlNjRkZDAxMjZjMzZjMTg0MzhhZTVhIiwib2JqdHlwZSI6Im1lc3NhZ2VzIn0",
            "messageId": "1-625f48c5-3fe64dd0126c36c18438ae5a",
            "tags": Array [],
          },
          Object {
            "__typename": "Messages",
            "content": Object {
              "__typename": "Content",
              "blocks": Array [
                Object {
                  "__typename": "TextBlock",
                  "text": "world",
                  "type": "text",
                },
              ],
              "body": "world
      ",
              "data": null,
              "title": "hello",
              "trackingIds": null,
            },
            "created": "2022-04-19T23:40:48.023Z",
            "id": "eyJpZCI6IjEtNjI1ZjQ4N2YtZjE4NzZhMWY1OWU0OTA1ODEzNTg1MTFlIiwib2JqdHlwZSI6Im1lc3NhZ2VzIn0",
            "messageId": "1-625f487f-f1876a1f59e490581358511e",
            "tags": Array [],
          },
          Object {
            "__typename": "Messages",
            "content": Object {
              "__typename": "Content",
              "blocks": Array [
                Object {
                  "__typename": "TextBlock",
                  "text": "world",
                  "type": "text",
                },
              ],
              "body": "world
      ",
              "data": null,
              "title": "hello",
              "trackingIds": null,
            },
            "created": "2022-04-19T23:38:24.754Z",
            "id": "eyJpZCI6IjEtNjI1ZjQ3ZWUtNzkyYTMxMDhiOTU0NjQ5MDg0MWVmMDk5Iiwib2JqdHlwZSI6Im1lc3NhZ2VzIn0",
            "messageId": "1-625f47ee-792a3108b9546490841ef099",
            "tags": Array [],
          },
          Object {
            "__typename": "Messages",
            "content": Object {
              "__typename": "Content",
              "blocks": Array [
                Object {
                  "__typename": "TextBlock",
                  "text": "world",
                  "type": "text",
                },
              ],
              "body": "world
      ",
              "data": null,
              "title": "hello",
              "trackingIds": null,
            },
            "created": "2022-04-19T23:27:44.607Z",
            "id": "eyJpZCI6IjEtNjI1ZjQ1NmQtZjAyODgwOTRkODhlYTVjZDFmZjBhMWY0Iiwib2JqdHlwZSI6Im1lc3NhZ2VzIn0",
            "messageId": "1-625f456d-f0288094d88ea5cd1ff0a1f4",
            "tags": Array [],
          },
          Object {
            "__typename": "Messages",
            "content": Object {
              "__typename": "Content",
              "blocks": Array [
                Object {
                  "__typename": "TextBlock",
                  "text": "world",
                  "type": "text",
                },
              ],
              "body": "world
      ",
              "data": null,
              "title": "hello",
              "trackingIds": null,
            },
            "created": "2022-04-19T20:48:40.232Z",
            "id": "eyJpZCI6IjEtNjI1ZjIwMjUtNjNiMDNmOWMxZmM3ODBkODQ3Yjc1YTE3Iiwib2JqdHlwZSI6Im1lc3NhZ2VzIn0",
            "messageId": "1-625f2025-63b03f9c1fc780d847b75a17",
            "tags": Array [],
          },
        ],
        "startCursor": null,
      }
    `);
  });
});
