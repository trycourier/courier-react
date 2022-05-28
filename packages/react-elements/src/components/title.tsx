import React from "react";
import styled, { CSSObject } from "styled-components";
import { CourierElement } from "../types";

export type TitleParams = {
  /** heading level. Defaults to two. */
  level?: number;
  color?: string;
  size?: number | string;
  weight?: number | string;
  style?: CSSObject;
  children?: React.ReactNode;
};

const getTitleStyles = ({ size, weight, color }: TitleParams): CSSObject => ({
  fontSize: size ?? "16px",
  fontStyle: "normal",
  fontWeight: (weight ?? 800) as any,
  fontFamily: `'Nunito Sans', sans-serif`,
  lineHeight: "19px",
  textAlign: "left",
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: color ?? "#24324B",
});

const headings: Record<string, CourierElement<TitleParams>> = {
  H1: styled.h1<TitleParams>(getTitleStyles),
  H2: styled.h2<TitleParams>(getTitleStyles),
  H3: styled.h3<TitleParams>(getTitleStyles),
  H4: styled.h4<TitleParams>(getTitleStyles),
  H5: styled.h5<TitleParams>(getTitleStyles),
};

export const Title: CourierElement<TitleParams> = (opts: TitleParams) => {
  const { level = 2, ...rest } = opts;
  const Heading = headings[`H${level}`] ?? headings.H2;
  const index = Math.min(Math.max(level - 1, 0), 4);
  const weight = ["900", "800", "700", "500", "300"][index];
  const size = ["18px", "16px", "14px", "12px", "10px"][index];
  return <Heading weight={weight} size={size} {...rest} />;
};
