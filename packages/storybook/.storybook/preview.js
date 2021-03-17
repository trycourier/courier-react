import React from "react";

import { Normalize } from "styled-normalize";
import { addParameters, addDecorator } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addDecorator((storyFn) =>
  React.createElement(() => (
    <>
      <Normalize />
      <div style={{ margin: 24 }}>{storyFn()}</div>
    </>
  ))
);
