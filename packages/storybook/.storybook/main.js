const path = require("path");

module.exports = {
  stories: [
    "../stories/*/*.stories.@(ts|tsx|js|jsx|mdx)",
    "../stories/*.stories.@(ts|tsx|js|jsx|mdx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-docs",
  ],
};
