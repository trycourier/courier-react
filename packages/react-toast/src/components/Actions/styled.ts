import styled from "styled-components";
import deepExtend from "deep-extend";

export const Container = styled.div(({ theme }) =>
  deepExtend(
    {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignSelf: "center",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "14px",
      letterSpacing: "0em",
      textAlign: "center",
      borderLeft: "1px solid #CBD5E0",
      padding: "0",
      height: "100%",
      justifyContent: "center",
      marginLeft: "28px",
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
      color: theme?.brand?.primaryColor ?? "#9121C2",
      textDecoration: "none",
      ":visited": {
        color: theme?.brand?.primaryColor ?? "#9121C2",
      },
      "&:hover": {
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
