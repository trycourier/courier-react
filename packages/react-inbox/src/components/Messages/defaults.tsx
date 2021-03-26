import styled from "styled-components";
import React from "react";
import CourierLogo from "./courier_logo_text.svg";

export const Footer = styled.div(({ theme }) => ({
  "borderBottomLeftRadius": 24,
  "borderBottomRightRadius": 24,
  "height": 45,
  "fontSize": "10px",
  "fontStyle": "normal",
  "fontWeight": "700",
  "lineHeight": "14px",
  "letterSpacing": "0em",
  "textAlign": "left",
  "color": "#B9C0CD",
  "display": "flex",
  "alignItems": "flex-end",
  "justifyContent": "flex-end",
  "> div": {
    margin: "auto 20px auto auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ...theme.footer,
}));


export function renderFooter() {
  return (<Footer><div><span style={{ marginTop: 2 }}>Powered by&nbsp;&nbsp;</span><CourierLogo /></div></Footer>);
}