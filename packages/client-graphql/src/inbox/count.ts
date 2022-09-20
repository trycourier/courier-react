import { Client } from "urql";

export const GET_INBOX_COUNT = `
  query GetInboxCount($params: FilterParamsInput) {
    count(params: $params)
  }
`;

export interface IInboxCountParams {
  status: "read" | "unread";
  tags?: string[];
}
export type GetInboxCount = (
  params?: IInboxCountParams
) => Promise<{ count: number }>;
export const getInboxCount =
  (client?: Client): GetInboxCount =>
  async (params) => {
    if (!client) {
      return Promise.resolve();
    }

    const results = await client
      .query(GET_INBOX_COUNT, {
        params,
      })
      .toPromise();
    return results?.data;
  };
