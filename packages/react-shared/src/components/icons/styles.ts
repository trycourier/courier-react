import deepExtend from "deep-extend";
import { CSSObject } from "styled-components";
import { IconProps } from "./types";

export const genIconStyles = (props: IconProps): CSSObject =>
  deepExtend(
    {
      height: props.width ?? 25,
      width: props.height ?? 25,
      flexShrink: "0",
      path: {
        fill: props.fill ?? "#9121c2",
      },
    },
    props.css ?? {}
  );
