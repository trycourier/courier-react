module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
<<<<<<< HEAD
  roots: ["<rootDir>"],
  verbose: true,

  globals: {
    "ts-jest": {
      babelConfig: require("./babel.config.js"),
    },
  },
=======
  roots: ["<rootDir>/src"],
>>>>>>> first

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
<<<<<<< HEAD
    "\\.(ts|tsx|js|jsx)$": "ts-jest",
=======
    "^.+\\.tsx?$": "ts-jest",
>>>>>>> first
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-styled-components",
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
<<<<<<< HEAD
  testRegex: "(/__tests__/.*(test|spec)).tsx?$",
=======
  testRegex: "(/__tests__/.*(test|spec))\.tsx?$",
>>>>>>> first

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
<<<<<<< HEAD
    "~(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/__tests__/setup.ts"],
  collectCoverage: true,
};
=======
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/src/__tests__/setup.ts"],
  collectCoverage: true,
};
>>>>>>> first
