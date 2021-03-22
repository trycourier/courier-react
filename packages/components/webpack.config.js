/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode ? argv.mode : "development",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      publicPath: isProduction
        ? "https://courier-components-xvdza5.s3.amazonaws.com/"
        : undefined,
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
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
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
    optimization: {
      minimizer: [isProduction && new UglifyJsPlugin()].filter(Boolean),
    },
  };
};
