module.exports = {
  sourceType: "unambiguous",
  plugins: [
    "@babel/transform-runtime",
    "transform-inline-environment-variables",
    "transform-class-properties",
    process.env.NODE_ENV !== "test" && [
      "babel-plugin-root-import",
      {
        rootPathSuffix: "./src",
        rootPathPrefix: "~/",
      },
    ],
  ].filter(Boolean),
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
};
