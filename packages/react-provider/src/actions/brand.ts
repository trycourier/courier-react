const GET_BRAND = `
query GetBrand($brandId: String!) {
  brand(brandId: $brandId) {
    settings {
        colors {
            primary
        }
    }
}
}
`;

export const getBrand = async (client, brandId) => {
  const results = await client
    .query(GET_BRAND, {
      brandId,
    })
    .toPromise();
  const primaryColor = results?.data?.brand?.settings?.colors?.primary;
  return {
    primaryColor,
  };
};
