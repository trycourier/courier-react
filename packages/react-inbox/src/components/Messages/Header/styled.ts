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
