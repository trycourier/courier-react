import { Client } from "urql";

export const GET_INBOX_COUNT = `
  query GetInboxCount($params: FilterParamsInput) {
    count(params: $params)
  }
`;

export interface IInboxCountParams {
  tenantId?: string;
  status: "read" | "unread";
  tags?: string[];
  from?: string | number;
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

    const { tenantId, ...rest } = params || {};

    const results = await client
      .query(GET_INBOX_COUNT, {
        params: {
          ...rest,
          // [HACK] map tenantId to accountId in order to keep this backwards compatible
          accountId: tenantId,
        },
      })
      .toPromise();
    return results?.data;
  };
