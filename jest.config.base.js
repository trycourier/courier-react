module.exports = (babelConfig) => ({
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/__mocks__/**",
    "!**/__smoke_tests__/**",
    "!**/__tests__/**",
    "!**/@types/**",
    "!**/*.d.ts",
    "!**/*.spec.ts",
    "**/src/**/*.{js,ts}",
  ],
  coverageReporters: ["text", "text-summary", "html", "json"],
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>"],

  globals: {
    "ts-jest": {
      babelConfig,
    },
  },

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "~(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "helpers"],
});
