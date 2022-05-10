import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

export interface IGetBannerParams {
  from?: number;
  locale?: string;
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

export const getBanners = (client?: Client): GetBanners => async (
  params?: IGetBannerParams,
  after?: string
) => {
  if (!client) {
    return Promise.resolve(undefined);
  }

  const results = await client
    .query(QUERY_BANNER, { after, params })
    .toPromise();

  const banners = results?.data?.banners?.nodes;
  const startCursor = results?.data?.banners?.pageInfo?.startCursor;

  return {
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
