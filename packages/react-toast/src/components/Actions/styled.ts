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

const getButtonStyles = (theme) =>
  deepExtend(
    {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#73819B",
      backgroundColor: "white",
      textDecoration: "none",
      "&:hover": {
        background: "rgb(0 0 0 / 10%)",
      },
    },
    theme
  );

export const Details = styled.a(({ theme }) =>
  getButtonStyles(theme?.message?.action)
);
