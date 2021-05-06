import styled from "styled-components";
import deepExtend from "deep-extend";

export const Container = styled.div(({ theme }) =>
  deepExtend(
    {
      alignSelf: "center",
      borderLeft: "1px solid #CBD5E0",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      letterSpacing: "0em",
      lineHeight: "14px",
      textAlign: "center",
      width: "80px",
      padding: "0",
      height: "100%",
      justifyContent: "center",
      "> :nth-child(2)": {
        "border-top": "1px solid #CBD5E0",
      },
    },
    theme?.message?.actions?.container
  )
);

const getButtonStyles = (theme, styles) =>
  deepExtend(
    {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme?.brand?.colors?.primary ?? "#9121C2",
      backgroundColor: theme?.brand?.inapp?.colors?.invertButtons
        ? theme?.brand?.colors?.primary
        : "white",
      textDecoration: "none",
      "&:hover": {
        color: theme?.brand?.inapp?.colors?.invertButtons
          ? theme?.brand?.colors?.primary ?? "#9121C2"
          : "white",
        background: "rgb(0 0 0 / 10%)",
      },
    },
    styles
  );

export const Details = styled.a(({ theme }) =>
  getButtonStyles(theme, theme?.message?.actions?.details)
);

export const Dismiss = styled.a(({ theme }) =>
  getButtonStyles(theme, theme?.message?.actions?.dismiss)
);
