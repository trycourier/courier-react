import styled from "styled-components";
import deepExtend from "deep-extend";

export const iconStyles = ({ theme }) =>
  deepExtend(
    {
      flexShrink: "0",
      marginLeft: 12,
      objectFit: "contain",
      alignSelf: "center",
      padding: "2px",
      maxHeight: "40px !important",
      maxWidth: "40px !important",
      path: {
        fill: theme?.brand?.colors?.primary ?? "#9121c2",
      },
    },
    theme?.message?.icon
  );

export const Icon = styled.img(iconStyles);
export const Container = styled.div`
  display: flex;
`;

export const Message = styled.div(({ theme }) =>
  deepExtend(
    {
      flexShrink: 0,
      padding: 12,
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "14px",
      maxWidth: "165px",
      letterSpacing: "0em",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      overflowWrap: "break-word",
      alignSelf: "center",
    },
    theme?.message?.contents
  )
);

export const Body = styled.div(({ theme }) => theme?.message?.body);

export const Title = styled.div(({ theme }) =>
  deepExtend(
    {
      fontWeight: 600,
      color: "#344563",
      marginBottom: 2,
    },
    theme?.message?.title
  )
);
