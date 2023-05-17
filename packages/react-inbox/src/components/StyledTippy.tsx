import React from "react";
import styled from "styled-components";
import Tippy, { TippyProps } from "@tippyjs/react";
import deepExtend from "deep-extend";

const Styled = styled(Tippy)(({ theme }) =>
  deepExtend(
    {},
    {
      minWidth: "125px",

      ".tippy-content": {
        boxSizing: "border-box",
        backgroundColor: "#1c273a",
        padding: "10px 8px",
        fontSize: "12px",
        lineHeight: "12px",
        textAlign: "center",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        color: "white",
        fontWeight: 700,
        borderRadius: "4px !important",
        "> div": {
          width: "100%",
        },
      },
    },
    theme.tooltip
  )
);

interface Theme {
  theme: any;
}

export interface NewTippyProps extends Omit<TippyProps, "theme">, Theme {}

const StyledTippy: React.FunctionComponent<NewTippyProps> = (props) => {
  return <Styled {...props} offset={[0, 3]} />;
};

export default StyledTippy;
