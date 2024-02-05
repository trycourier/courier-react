/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  const isStaging = process.env.IS_STAGING;
  const distPath = path.resolve(__dirname, "./dist");
  const version = require(path.resolve(__dirname, "./package.json")).version;
  const versionedFilePrefix = isStaging ? "staging-v" : "v";

  return {
    mode: argv.mode ? argv.mode : "development",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      publicPath: isProduction
        ? "https://courier-push-provider-dev-couriercomponentsbucket-l1epe9yidbcn.s3.amazonaws.com/"
        : undefined,
      filename: `${versionedFilePrefix}${version}.js`,
      chunkFilename: "[id].[chunkhash:8].js",
      path: distPath,
    },
    plugins: [
      !isProduction &&
        new HtmlWebpackPlugin({
          template: "src/index.html",
        }),
      process.env.ANALYZE && new BundleAnalyzerPlugin(),
      new webpack.EnvironmentPlugin({
        API_URL: "https://api.courier.com",
        COURIER_WS_URL:
          "wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production",
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          type: "javascript/auto",
          test: /\.mjs$/,
          use: [],
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
    },
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "../../node_modules")],
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
  };
};
