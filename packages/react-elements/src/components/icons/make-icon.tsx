import deepExtend from "deep-extend";
import React from "react";
import styled, { CSSObject } from "styled-components";
import { IconProps } from "./types";

export function makeIcon(
  Svg: React.FunctionComponent
): React.FunctionComponent<IconProps> {
  const Icon = styled(Svg)<IconProps>(genSvgStyles);
  return (props: IconProps) => {
    return (
      <IconContainer {...props}>
        <Icon {...props} />
      </IconContainer>
    );
  };
}

const IconContainer = styled.span<IconProps>((props) => {
  const size = getSize(props);
  return deepExtend(
    {
      display: "inline-block",
      ...size,
    },
    props.css ?? {}
  );
});

function getSize({
  size,
}: IconProps): { width: number | string; height: number | string } {
  if (typeof size === "number") {
    return { width: size, height: size };
  }

  switch (size) {
    case "xs":
      return { width: 25, height: 25 };
    case "sm":
      return { width: 35, height: 35 };
    case "md":
      return { width: 55, height: 55 };
    case "lg":
      return { width: 85, height: 85 };
    default:
      return { width: 30, height: 30 };
  }
}

export const genSvgStyles = (props: IconProps): CSSObject =>
  deepExtend(
    {
      flexShrink: "0",
      objectFit: "contain",
      path: {
        fill: props.color ?? "#9121c2",
      },
    },
    props.svgCSS ?? {}
  );
