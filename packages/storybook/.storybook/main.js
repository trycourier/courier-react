module.exports = {
  stories: [
    "../stories/*.stories.@(ts|tsx|js|jsx|mdx)",
    "../stories/*/*.stories.@(ts|tsx|js|jsx|mdx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
};
