export const DEFAULT_BRAND = {
  data: {
    defaultBrand: {
      settings: {
        colors: {
          primary: "#FFFFFF",
          secondary: null,
          tertiary: null,
          __typename: "BrandColors",
        },
        inapp: null,
        __typename: "BrandSettings",
      },
      __typename: "Brand",
    },
  },
  extensions: {
    tracing: {
      version: 1,
      startTime: "2021-04-23T22:10:14.586Z",
      endTime: "2021-04-23T22:10:14.695Z",
      duration: 108980157,
      execution: {
        resolvers: [
          {
            path: ["defaultBrand"],
            parentType: "Query",
            fieldName: "defaultBrand",
            returnType: "Brand",
            startOffset: 241418,
            duration: 107085289,
          },
          {
            path: ["defaultBrand", "settings"],
            parentType: "Brand",
            fieldName: "settings",
            returnType: "BrandSettings",
            startOffset: 107413217,
            duration: 35225,
          },
          {
            path: ["defaultBrand", "settings", "colors"],
            parentType: "BrandSettings",
            fieldName: "colors",
            returnType: "BrandColors",
            startOffset: 107485843,
            duration: 15525,
          },
          {
            path: ["defaultBrand", "settings", "colors", "primary"],
            parentType: "BrandColors",
            fieldName: "primary",
            returnType: "String",
            startOffset: 107519637,
            duration: 10134,
          },
          {
            path: ["defaultBrand", "settings", "colors", "secondary"],
            parentType: "BrandColors",
            fieldName: "secondary",
            returnType: "String",
            startOffset: 107540712,
            duration: 7991,
          },
          {
            path: ["defaultBrand", "settings", "colors", "tertiary"],
            parentType: "BrandColors",
            fieldName: "tertiary",
            returnType: "String",
            startOffset: 107556020,
            duration: 7620,
          },
          {
            path: ["defaultBrand", "settings", "inapp"],
            parentType: "BrandSettings",
            fieldName: "inapp",
            returnType: "BrandInApp",
            startOffset: 108838166,
            duration: 65614,
          },
        ],
      },
    },
  },
};
