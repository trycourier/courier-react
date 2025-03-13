import { Client } from "urql";
import { createCourierClient } from "./client";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "./types";

export interface IGetBannerParams {
  from?: number;
  limit?: number;
  locale?: string;
  tags?: string[];
  getTrackindIds?: boolean;
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
        userId
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
        }
      }
    }
  }
`;
export const QUERY_BANNER_WITH_TRACKING = `
  query GetBanners($params: BannerParamsInput, $limit: Int = 10, $after: String){
    banners(params: $params, limit: $limit, after: $after) {
      totalCount
      pageInfo {
        startCursor
        hasNextPage
      }
      nodes {
        id
        userId
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
            archiveTrackingId
          }
        }
      }
    }
  }
`;

type GetBanners = (
  params?: IGetBannerParams,
  after?: string
) => Promise<
  | {
      startCursor: string;
      banners: any[];
    }
  | undefined
>;

export const getBanners =
  (client?: Client): GetBanners =>
  async (params?: IGetBannerParams, after?: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const { limit, getTrackindIds, ...restParams } = params ?? {};
    const results = await client
      .query(getTrackindIds ? QUERY_BANNER_WITH_TRACKING : QUERY_BANNER, {
        after,
        limit,
        params: restParams,
      })
      .toPromise();

    const banners = results?.data?.banners?.nodes;
    const startCursor = results?.data?.banners?.pageInfo?.startCursor;

    return {
      banners,
      startCursor,
    };
  };

export default (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  getBanners: GetBanners;
} => {
  const client = createCourierClient(params);

  return {
    getBanners: getBanners(client),
  };
};
