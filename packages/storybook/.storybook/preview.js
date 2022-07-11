import React from "react";

import { Normalize } from "styled-normalize";
import { addDecorator } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import githubCss from "./github.css";
import styled from "styled-components";

const Styled = styled.div`
  ${githubCss};
  width: 1000px;

  img {
    max-width: 100%;
  }
`;

addDecorator((storyFn) =>
  React.createElement(() => (
    <Styled>
      <Normalize />
      <div style={{ margin: 24 }}>{storyFn()}</div>
    </Styled>
  ))
);

export const parameters = {
  options: {
    storySort: {
      order: ["Introduction", "Getting Started", "Authentication"],
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
