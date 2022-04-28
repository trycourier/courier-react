import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

export interface IGetBannerParams {
  from?: number;
  tags?: string[];
}

export const QUERY_BANNER = `
  query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String){
    banners(params: $params, limit: $limit, after: $after) {
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

type GetBanners = (
  params?: IGetBannerParams,
  after?: string
) => Promise<{
  startCursor: string;
  banners: any[];
} | void>;

export const getBanners = (client?: Client): GetBanners => async (
  params?: IGetBannerParams,
  after?: string
) => {
  if (!client) {
    return Promise.resolve();
  }

  const results = await client
    .query(QUERY_BANNER, { after, params })
    .toPromise();

  const banners = results?.data?.banners?.nodes;
  const startCursor = results?.data?.banners?.pageInfo?.startCursor;

  return {
    appendMessages: Boolean(after),
    banners,
    startCursor,
  };
};

export default (
  params: ICourierClientParams | { client: Client }
): {
  getBanners: GetBanners;
} => {
  const client = createCourierClient(params);

  return {
    getBanners: getBanners(client),
  };
};
