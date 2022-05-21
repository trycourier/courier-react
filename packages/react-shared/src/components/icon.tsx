import deepExtend from "deep-extend";
import styled, { CSSObject } from "styled-components";
import { ThemedOpts } from "~/types";

export const getStandardIconStyles = ({ theme }: ThemedOpts): CSSObject =>
  deepExtend(
    {
      height: 25,
      width: 25,
      flexShrink: "0",
      path: {
        fill: theme?.brand?.colors?.primary ?? "#9121c2",
      },
    },
    theme?.message?.icon ?? {}
  );

export const Icon = styled.img<ThemedOpts>((opts) =>
  getStandardIconStyles(opts)
);
