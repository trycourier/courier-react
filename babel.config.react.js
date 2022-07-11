module.exports = (root) => ({
  sourceType: "unambiguous",
  plugins: [
    "inline-react-svg",
    "@babel/transform-runtime",
    "babel-plugin-styled-components",
    "transform-inline-environment-variables",
    "transform-class-properties",
    [
      "babel-plugin-inline-import",
      {
        extensions: [".css"],
      },
    ],
    ["babel-plugin-react-remove-properties", { properties: ["data-testid"] }],
    [
      "babel-plugin-root-import",
      {
        root,
        rootPathSuffix: "./src",
        rootPathPrefix: "~/",
      },
    ],
  ].filter(Boolean),
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-env",
    "@babel/preset-react",
  ],
  ignore: ["src/__tests__", "src/__mocks__"],
});
