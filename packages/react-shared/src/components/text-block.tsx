import deepExtend from "deep-extend";
import styled, { CSSObject } from "styled-components";

export const TextBlock = styled.div<{ css?: CSSObject }>(({ css }) =>
  deepExtend(
    {
      color: "#73819B",
      marginTop: "1px",
      wordBreak: "break-word",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "16px",
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    css ?? {}
  )
);
