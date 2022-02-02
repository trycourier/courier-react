const brandProps = `
settings {
  colors {
    primary
    secondary
    tertiary
  }
  inapp {
    borderRadius
    disableMessageIcon
    disableCourierFooter
    placement
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

export const getBrand = async (client, brandId) => {
  const results = brandId
    ? await client.query(GET_BRAND, {
        brandId,
      })
    : await client.query(GET_INAPP_BRAND);

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
