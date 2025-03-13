import { ICourierClientBasicParams, ICourierClientJWTParams } from "./types";
import { Client } from "urql";
import { createCourierClient } from "./client";

export const brandProps = `
settings {
  colors {
    primary
    secondary
    tertiary
  }
  inapp {
    borderRadius
    disableCourierFooter
    disableMessageIcon
    placement
    emptyState {
      textColor
      text
    }
    widgetBackground {
      topColor
      bottomColor
    }
    colors {
      invertHeader
      invertButtons
    }
    icons {
      bell
      message
    }
    renderActionsAsButtons
    slots {
      id
      label {
        value
        color
      }
      icon {
        value
        color
      }
    }
    toast {
      timerAutoClose
      borderRadius
    }
  }
}
preferenceTemplates {
  nodes {
    defaultStatus
    templateName
    templateId
  }
}
`;

const GET_BRAND = `
query GetBrand($brandId: String!) {
  brand(brandId: $brandId) {
    ${brandProps}
  }
}
`;

const GET_INAPP_BRAND = `
query GetInAppBrand {
  inAppBrand {
    ${brandProps}
  }
}
`;

type GetBrand = (brandId?: string) => Promise<
  | {
      colors: any;
      inapp: any;
      preferenceTemplates: any;
    }
  | undefined
>;

export const getBrand =
  (client?: Client): GetBrand =>
  async (brandId) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const results = brandId
      ? await client
          .query(GET_BRAND, {
            brandId,
          })
          .toPromise()
      : await client.query(GET_INAPP_BRAND).toPromise();

    const brandProp = brandId ? "brand" : "inAppBrand";
    const brand = results?.data?.[brandProp];

    const colors = brand?.settings?.colors;
    const inapp = brand?.settings?.inapp;
    const preferenceTemplates = brand?.preferenceTemplates?.nodes;

    return {
      colors,
      inapp,
      preferenceTemplates,
    };
  };

export default (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  getBrand: GetBrand;
} => {
  const client = createCourierClient(params);

  return {
    getBrand: getBrand(client),
  };
};
