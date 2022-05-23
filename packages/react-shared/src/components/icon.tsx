import deepExtend from "deep-extend";
import styled, { CSSObject } from "styled-components";

export type IconProps = {
  fill?: string;
  css?: CSSObject;
};

export const getStandardIconStyles = ({ fill, css }: IconProps): CSSObject =>
  deepExtend(
    {
      height: 25,
      width: 25,
      flexShrink: "0",
      path: {
        fill: fill ?? "#9121c2",
      },
    },
    css ?? {}
  );

export const Icon = styled.img<IconProps>((opts) =>
  getStandardIconStyles(opts)
);
