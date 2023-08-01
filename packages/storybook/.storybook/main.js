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
  env: (config) => ({
    ...config,
    CLIENT_KEY: process.env.CLIENT_KEY,
    USER_ID: process.env.USER_ID,
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
    INBOX_API_URL: process.env.INBOX_API_URL,
  }),
};
