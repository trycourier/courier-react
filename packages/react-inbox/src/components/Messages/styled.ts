import styled from "styled-components";

export const Body = styled.div(({ theme }) => ({
  maxHeight: 390,
  padding: "0 14px",
  background: "#FFFFFF",
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
  padding: "18px 20px",
  userSelect: "none",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  display: 'flex',
  justifyContent: 'space-between',
  ...theme.header,
}));

export const HeaderText = styled.div`
  color: rgb(52, 69, 99);
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
`

export const BodyText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  color: #9D3789;
`