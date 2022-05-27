import { CSSObject } from "styled-components";

export interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  // Color of the button
  color?: string;
  /** Defaults to white */
  textColor?: string;
  /** CSS Overrides to apply to the button*/
  css?: CSSObject;
}
