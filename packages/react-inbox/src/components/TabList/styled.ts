import styled from "styled-components";
import deepExtend from "deep-extend";

export const Container = styled.div(({ theme }) =>
  deepExtend(
    {
      display: "flex",
      height: "41px",
      background: "#f7f6f9",
    },
    theme?.tabList?.container
  )
);

export const Tab = styled.div(({ theme }) =>
  deepExtend(
    {
      backgroundColor: "#F9FAFB",
      color: "#73819b",
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      fontStyle: "normal",
      lineHeight: "19px",
      letterSpacing: "0em",
      fontWeight: 400,
      textAlign: "center",
      cursor: "pointer",

      border: "1px solid rgba(203, 213, 224, 0.2)",
      borderTop: "1px solid rgba(203, 213, 224, 0.5)",
      borderBottom: "2px solid transparent",

      "&.active": {
        color: theme?.brand?.colors?.primary ?? "#9121c2",
        fontWeight: "600",
        borderBottom: `2px solid ${theme?.brand?.colors?.primary ?? "#9121c2"}`,
      },
    },
    theme?.tabList?.tab
  )
);
