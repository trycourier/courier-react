import styled from "styled-components";

export const Container = styled.div<{ view?: string }>(({ theme, view }) => ({
  padding: "18px",
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 18,
  fontWeight: 700,
  height: "65px",
  color: theme?.brand?.inapp?.colors?.invertHeader
    ? "white"
    : "rgb(36, 50, 75)",
  backgroundColor: theme?.brand?.inapp?.colors?.invertHeader
    ? theme?.brand?.colors?.primary
    : "white",

  "svg:hover path": {
    fill: theme?.brand?.colors?.primary ?? "#9121c2",
  },
  "svg path": {
    fill:
      view === "preferences"
        ? theme?.brand?.colors?.primary ?? "#9121c2"
        : undefined,
  },
  ".actions": {
    display: "flex",
    alignItems: "center",
  },
}));

export const MarkAllAsRead = styled.div(({ theme }) => ({
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "0em",
  color: theme?.brand?.inapp?.colors?.invertHeader ? "white" : "#73819B",
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

export const PreferenceSubHeader = styled.a(({ theme }) => ({
  cursor: "pointer",
  color: theme?.brand?.inapp?.colors?.invertHeader
    ? "white"
    : theme?.brand?.colors?.primary ?? "#9121c2",
  fontSize: "12px",
}));
