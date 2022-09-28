import { Client } from "urql";
import { brandProps } from "./brands";
import { createCourierClient } from "./client";
import { ICourierClientBasicParams } from "./types";

interface IInitialStateParams {
  skipFetchBrand?: boolean;
  brandId?: string;
  from?: number;
}

type GetInitialState = (params: IInitialStateParams) => Promise<
  | {
      brand?: any;
      unreadMessageCount: number;
    }
  | undefined
>;

const buildQuery = ({
  skipFetchBrand,
  brandId,
}: Partial<IInitialStateParams>) => {
  if (skipFetchBrand) {
    return `
      query InitialState($params: FilterParamsInput) {
        messageCount(params: $params)
      }
    `;
  }

  if (brandId) {
    return `
      query InitialState($brandId: String!, $params: FilterParamsInput) {
        messageCount(params: $params)
        brand(brandId: $brandId) {
          ${brandProps}
        }
      }
    `;
  }

  return `
    query InitialState($params: FilterParamsInput) {
      messageCount(params: $params)
      inAppBrand {
        ${brandProps}
      }
    } 
  `;
};

export const getInitialState =
  (client?: Client): GetInitialState =>
  async ({ skipFetchBrand, brandId, from }: IInitialStateParams) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const QUERY = buildQuery({ skipFetchBrand, brandId });
    const results = await client
      .query(QUERY, {
        brandId,
        params: {
          from,
          isRead: false,
        },
      })
      .toPromise();

    const brandProp = brandId ? "brand" : "inAppBrand";
    const brand = results?.data?.[brandProp];

    if (brand) {
      const colors = brand?.settings?.colors;
      const inapp = brand?.settings?.inapp;
      const preferenceTemplates = brand?.preferenceTemplates?.nodes;

      return {
        brand: {
          colors,
          inapp,
          preferenceTemplates,
        },
        unreadMessageCount: results?.data?.messageCount ?? 0,
      };
    }

    return {
      unreadMessageCount: results?.data?.messageCount ?? 0,
    };
  };

export default (
  params: ICourierClientBasicParams | { client?: Client }
): {
  getInitialState: GetInitialState;
} => {
  const client = createCourierClient(params);

  return {
    getInitialState: getInitialState(client),
  };
};
