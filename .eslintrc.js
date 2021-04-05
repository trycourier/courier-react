module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "cypress", "prettier", "react"],
  parserOptions: {
    ecmaVersion: 2017,
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    "cypress/globals": true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "cypress/no-unnecessary-waiting": 0,
    "no-empty-pattern": 0,
    "no-self-assign": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    "no-else-return": 2,
  },
};
