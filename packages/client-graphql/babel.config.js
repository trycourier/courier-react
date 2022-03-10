module.exports = {
  sourceType: "unambiguous",
  plugins: [
    "@babel/transform-runtime",
    process.env.NODE_ENV !== "test" && [
      "babel-plugin-root-import",
      {
        rootPathSuffix: "./src",
        rootPathPrefix: "~/",
      },
    ],
  ].filter(Boolean),
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
  ignore: ["src/__tests__", "src/__mocks__"],
};
