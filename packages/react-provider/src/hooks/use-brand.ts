import { useEffect, useState } from "react";
import { useQuery } from "urql";

const GET_BRAND = `
query GetBrand($brandId: String!) {
  brand(brandId: $branId) {
    settings {
        colors {
            primary
        }
    }
}
}
`;

const useBrand = (brandId: { brandId: string }) => {
  const [brand, setBrand] = useState(null);
  if (brandId) {
    const [results] = useQuery({
      query: GET_BRAND,
      variables: {
        brandId,
      },
    });
    debugger;
    setBrand(results?.data);
  }
  console.log("brand", brand);
  return brand;
};

export default useBrand;
