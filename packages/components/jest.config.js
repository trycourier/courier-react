module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>"],

  globals: {
    "ts-jest": {
      babelConfig: require("./babel.config.js"),
    },
  },

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/"],
};
