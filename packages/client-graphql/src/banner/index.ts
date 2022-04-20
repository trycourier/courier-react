import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

export interface IGetBannerParams {
  from?: number;
  tags?: string[];
}

export const QUERY_BANNER = `
  query GetBanner($params: FilterParamsInput, $limit: Int = 10, $after: String){
    banner(params: $params, limit: $limit, after: $after) {
      totalCount
      pageInfo {
        startCursor
        hasNextPage
      }
      nodes {
        id
        messageId
        created
        tags
        content {
          title
          body
          blocks {
            ... on TextBlock {
              type
              text
            }
            ... on ActionBlock {
              type
              text
              url
            }
          }
          data
          trackingIds {
            clickTrackingId
            deliverTrackingId
          }
        }
      }
    }
  }
`;

type GetBanner = (
  params?: IGetBannerParams,
  after?: string
) => Promise<{
  startCursor: string;
  banner: any[];
} | void>;

export const getBanner = (client?: Client): GetBanner => async (
  params?: IGetBannerParams,
  after?: string
) => {
  if (!client) {
    return Promise.resolve();
  }

  const results = await client
    .query(QUERY_BANNER, { after, params })
    .toPromise();

  const banner = results?.data?.banner?.nodes;
  const startCursor = results?.data?.banner?.pageInfo?.startCursor;

  return {
    appendMessages: Boolean(after),
    banner,
    startCursor,
  };
};

export default (
  params: ICourierClientParams | { client: Client }
): {
  getBanner: GetBanner;
} => {
  const client = createCourierClient(params);

  return {
    getBanner: getBanner(client),
  };
};
