/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode ? argv.mode : "development",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      publicPath: isProduction ? "assets/" : "assets/",
      filename: "latest.js",
      chunkFilename: "[id].[chunkhash:8].js",
      path: path.resolve(__dirname, "./dist"),
    },
    plugins: [
      !isProduction &&
        new HtmlWebpackPlugin({
          template: "src/index.html",
        }),
      process.env.ANALYZE && new BundleAnalyzerPlugin(),
      new webpack.EnvironmentPlugin({
        API_URL: "",
        COURIER_WS_URL: "",
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
