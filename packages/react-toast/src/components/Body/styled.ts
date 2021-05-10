import styled from "styled-components";
import deepExtend from "deep-extend";

export const iconStyles = ({ theme }) =>
  deepExtend(
    {
      flexShrink: "0",
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
  padding-left: 12px;
  width: 100%;
`;

export const Message = styled.div(({ theme }) =>
  deepExtend(
    {
      padding: 12,
      fontSize: "12px",
      fontStyle: "normal",
      lineHeight: "14px",
      alignSelf: "center",
      color: "#73819B",
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
