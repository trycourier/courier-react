import deepExtend from "deep-extend";
import styled, { CSSObject } from "styled-components";

export type IconProps = {
  fill?: string;
  extend?: CSSObject;
};

export const getStandardIconStyles = ({ fill, extend }: IconProps): CSSObject =>
  deepExtend(
    {
      height: 25,
      width: 25,
      flexShrink: "0",
      path: {
        fill: fill ?? "#9121c2",
      },
    },
    extend ?? {}
  );

export const Icon = styled.img<IconProps>((opts) =>
  getStandardIconStyles(opts)
);
