/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const babelConfig = require("./babel.config.js");

module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "\\.(ts|tsx)$": ["babel-jest", babelConfig],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "helpers"],
};
