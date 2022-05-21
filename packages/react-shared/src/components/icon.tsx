import deepExtend from "deep-extend";
import styled from "styled-components";
import { ThemeFn } from "../types";

export const iconStyles: ThemeFn = ({ css }) =>
  deepExtend(
    {
      height: 25,
      width: 25,
      flexShrink: "0",
      path: {
        fill: "#9121c2",
      },
    },
    css ?? {}
  );

export const Icon = styled.img(iconStyles);
