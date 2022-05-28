import { CSSObject } from "styled-components";
import { ButtonProps } from "./types";

export const genButtonStyles = ({
  size = "sm",
  color,
  textColor,
}: ButtonProps): CSSObject => {
  const { height, fontSize } = getButtonSize(size);
  return {
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
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      color: "#73819B",
      background: "rgb(0 0 0 / 10%)",
    },

    borderRadius: 4,
  };
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
