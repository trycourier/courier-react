import deepExtend from "deep-extend";
import styled, { CSSObject } from "styled-components";

export const ActionBlock = styled.div<{
  backgroundColor?: string;
  css?: CSSObject;
}>(({ backgroundColor, css }) =>
  deepExtend(
    {
      a: {
        display: "inline-block",
        cursor: "pointer",
        border: "none",
        fontSize: 12,
        color: "white",
        backgroundColor: backgroundColor ?? "#9121C2",
        padding: "6px 15px",
        marginTop: 3,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        textDecoration: "none",
        "&:active": {
          boxShadow: "none",
        },

        "&:hover": {
          color: "#73819B",
          background: "rgb(0 0 0 / 10%)",
        },

        borderRadius: 4,
      },
    },
    css ?? {}
  )
);
