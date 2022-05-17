import styled from "styled-components";
import deepExtend from "deep-extend";

export const Container = styled.div<{ view?: string }>(({ theme, view }) =>
  deepExtend(
    {
      padding: "18px",
      paddingLeft: "38px",
      userSelect: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 24,
      fontWeight: 700,
      height: "65px",
      color: "rgb(36, 50, 75)",
      backgroundColor: "white",

      "svg:hover": {
        background: "#f7f6f9",
        "path, circle": {
          stroke: theme?.brand?.colors?.primary ?? "#9121c2",
        },
      },
      "svg path, svg circle": {
        stroke:
          view === "preferences"
            ? theme?.brand?.colors?.primary ?? "#9121c2"
            : undefined,
      },
      ".actions": {
        display: "flex",
        alignItems: "center",
      },
      borderTopLeftRadius: theme?.brand?.inapp?.borderRadius ?? "24px",
      borderTopRightRadius: theme?.brand?.inapp?.borderRadius ?? "24px",
    },
    theme?.header
  )
);

export const MarkAllAsRead = styled.button(() => ({
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "0em",
  color: "#73819B",
  border: "1px solid #E4DFF0",
  background: "white",
  padding: "4px 18px",
  borderRadius: "4px",
  "&:hover": {
    background: "#f7f6f9",
  },
}));

export const Heading = styled.div<{
  flexDirection?: "column";
  alignItems?: "center";
}>(({ theme, flexDirection, alignItems }) => ({
  display: "flex",
  flexDirection,
  alignItems,

  ".message-count": {
    fontSize: 18,
    marginLeft: 14,
    background: theme.brand?.colors?.primary ?? "#9121c2",
    color: "white",
    borderRadius: "17px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 27,
    padding: "0 6px",
    minWidth: 27,
  },
}));

export const PreferenceSubHeader = styled.a(({ theme }) => ({
  cursor: "pointer",
  color: theme?.brand?.colors?.primary ?? "#9121c2",
  fontSize: "12px",
}));
