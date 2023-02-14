// webpack.config.js

const pkgDir = require("pkg-dir");
const path = require("path");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /package\.json$/,
        type: "javascript/auto",
        use: {
          loader: "json-loader",
        },
      },
    ],
  },
  resolve: {
    alias: {
      // Use an alias to make it easier to import the root package.json
      "package.json": path.join(pkgDir.sync(__dirname), "package.json"),
    },
  },
};
