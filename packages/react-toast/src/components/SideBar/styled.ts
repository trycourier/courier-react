import styled from "styled-components";

export const Container = styled.div(({ theme }) => ({
  "width": "100%",
  "display": "flex",
  "flexDirection": "column",
  "alignSelf": "center",
  "fontSize": "12px",
  "fontStyle": "normal",
  "fontWeight": "400",
  "lineHeight": "14px",
  "letterSpacing": "0em",
  "textAlign": "center",
  "borderLeft": "1px solid #CBD5E0",
  "padding": "0",
  "height": "100%",
  "justifyContent": "center",
  "marginLeft": "28px",
  "> :nth-child(2)": {
    "border-top": "1px solid #CBD5E0",
  },
  ...theme,
}));

export const Button = styled.a(({ color, theme }) => ({
  "flex": "1",
  "display": "flex",
  "justifyContent": "center",
  "alignItems": "center",
  color,
  "textDecoration":"none",
  ":visited":  {
    color,
  },
  ...theme,
}));