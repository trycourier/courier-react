import deepExtend from "deep-extend";
import { CSSObject } from "styled-components";
import { ButtonProps } from "./types";

export const genButtonStyles = ({
  size = "sm",
  color,
  textColor,
  css,
}: ButtonProps): CSSObject => {
  const { height, fontSize } = getButtonSize(size);
  return deepExtend(
    {
      display: "inline-flex",
      cursor: "pointer",
      border: "none",
      fontSize,
      height,
      width: "auto",
      color: textColor ?? "white",
      backgroundColor: color ?? "#9121C2",
      boxSizing: "content-box",
      padding: "4px 15px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      textDecoration: "none",
      alignItems: "center",
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
};

function getButtonSize(
  size: ButtonProps["size"]
): { height: number; fontSize: number } {
  switch (size) {
    case "xs":
      return { height: 30, fontSize: 12 };
    case "sm":
      return { height: 34, fontSize: 14 };
    case "md":
      return { height: 38, fontSize: 16 };
    case "lg":
      return { height: 42, fontSize: 18 };
    default:
      return { height: 30, fontSize: 12 };
  }
}
