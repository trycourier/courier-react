import deepExtend from "deep-extend";
import styled, { CSSObject } from "styled-components";

export const Title = styled.div<{ css?: CSSObject }>(({ css }) =>
  deepExtend(
    {
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "19px",
      textAlign: "left",
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "#24324B",
    },
    css ?? {}
  )
);
