import deepExtend from "deep-extend";
import { CSSObject } from "styled-components";
import { ButtonProps } from "./types";

export const genButtonStyles = ({
  backgroundColor,
  css,
}: ButtonProps): CSSObject =>
  deepExtend(
    {
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
    css ?? {}
  );
