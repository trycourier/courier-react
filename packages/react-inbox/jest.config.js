/* eslint-disable @typescript-eslint/no-var-requires */
const jestConfigBase = require("../../jest.config.base");
const babelConfig = require("./babel.config.js");

module.exports = jestConfigBase(babelConfig);
