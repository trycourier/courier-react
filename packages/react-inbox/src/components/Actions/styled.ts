import styled from "styled-components";
import deepExtend from "deep-extend";

export const Container = styled.div`
  flex-shrink: 0;
`;

export const Action = styled.a<{ href: string; target: string }>(({ theme }) =>
  deepExtend(
    {
      cursor: "pointer",
      border: "none",
      fontSize: 12,
      color: theme?.brand?.inapp?.colors?.invertButtons
        ? "white"
        : theme?.brand?.colors?.primary ?? "#9121C2",
      backgroundColor: theme?.brand?.inapp?.colors?.invertButtons
        ? theme?.brand?.colors?.primary
        : "white",
      padding: "8px 15px",
      flexShrink: 0,
      maxHeight: 32,
      outline: "none",
      marginLeft: 6,
      maxWidth: 100,
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      textDecoration: "none",
      "&:active": {
        boxShadow: "none",
      },

      "&:hover": {
        color: theme?.brand?.inapp?.colors?.invertButtons
          ? theme?.brand?.colors?.primary ?? "#9121C2"
          : "white",
        background: "rgb(0 0 0 / 10%)",
      },

      borderRadius: 6,
    },
    theme?.message?.actions?.details
  )
);
