import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  padding: "18px 20px 12px",
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
  fontSize: 18,
  fontWeight: 700,
  lineHeight: "25px",
  color: theme?.brand?.inapp?.colors?.invertHeader
    ? "white"
    : "rgb(36, 50, 75)",
  backgroundColor: theme?.brand?.inapp?.colors?.invertHeader
    ? theme?.brand?.colors?.primary
    : "white",
}));

export const MarkAllAsRead = styled.div(({ theme }) => ({
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "0em",
  color: theme?.brand?.inapp?.colors?.invertHeader
    ? "white"
    : theme?.brand?.colors?.primary ?? "#9121c2",
}));

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  h3,
  h5 {
    margin: 0;
    svg {
      width: 3.88px;
      height: 7.76px;
    }
  }
`;

export const MessageSubHeader = styled.h5(({ theme }) => ({
  color: theme?.brand?.inapp?.colors?.invertHeader
    ? "white"
    : theme?.brand?.colors?.primary ?? "#24324B",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "22px",
}));

export const PreferenceSubHeader = styled.h5(({ theme }) => ({
  cursor: "pointer",
  color: theme?.brand?.inapp?.colors?.invertHeader
    ? "white"
    : theme?.brand?.colors?.primary ?? "#9121c2",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "12px",
  lineHeight: "16px",
}));
