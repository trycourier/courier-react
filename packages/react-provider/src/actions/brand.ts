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
    placement
    colors {
      invertHeader
      invertButtons
    }
    icons {
      bell
      message
    }
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

const GET_DEFAULT_BRAND = `
query GetDefaultBrand() {
  defaultBrand {
    ${brandProps}
  }
}
`;

export const getBrand = async (client, brandId) => {
  const results = brandId
    ? await client.query(GET_BRAND, {
        brandId,
      })
    : await client.query(GET_DEFAULT_BRAND);

  const colors = results?.data?.brand?.settings?.colors;
  const inapp = results?.data?.brand?.settings?.inapp;

  return {
    colors,
    inapp,
  };
};
