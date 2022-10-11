import React from "react";
import styled from "styled-components";
import Tippy, { TippyProps } from "@tippyjs/react";

const Styled = styled(Tippy)`
  min-width: 125px;

  .tippy-content {
    box-sizing: border-box;
    background-color: #1c273a;
    padding: 10px 8px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    color: white;
    font-weight: 700;
    border-radius: 4px !important;
  }
`;

const StyledTippy: React.FunctionComponent<TippyProps> = (props) => {
  return <Styled {...props} offset={[0, 3]} />;
};

export default StyledTippy;
