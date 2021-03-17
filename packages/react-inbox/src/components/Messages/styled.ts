import styled from "styled-components";
import { Pulse } from "better-react-spinkit";

export const Body = styled.div(({ theme }) => ({
  maxHeight: 390,
  padding: "0 14px",
  background: "#F9FAFB",
  overflow: "scroll",
  ...theme.body,
}));

export const Footer = styled.div(({ theme }) => ({
  padding: 12,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  ...theme.footer,
}));

export const Header = styled.div(({ theme }) => ({
  background: "white",
  color: "rgb(52, 69, 99)",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "10px 18px",
  userSelect: "none",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  ...theme.header,
}));

export const Loading = styled(Pulse)(({theme}) => ({
  display: "block",
  textAlign: "center",
  div:  {
    display: "inline-block",
  },
  ...theme.loading
}));
