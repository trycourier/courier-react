import styled from "styled-components";

export const Body = styled.div(({ theme }) => ({
  background: "#FFFFFF",
  overflow: "scroll",
  display: "flex",
  height: 365,
  flexDirection: "column",
  borderTop: "1px solid rgba(203,213,224,.5)",
  ...theme.body,
}));

export const Header = styled.div(({ theme }) => ({
  padding: "18px 20px 12px 20px",
  userSelect: "none",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  display: "flex",
  justifyContent: "space-between",
  ...theme.header,
}));

export const HeaderText = styled.div`
  color: #24324b;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
`;

export const BodyText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  color: #9121c2;
`;

export const Empty = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  color: #73819b;
  margin: auto;
`;

export const Footer = styled.div(({ theme }) => ({
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  height: 45,
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "14px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#B9C0CD",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  ...theme.footer,
}));

export const FooterContent = styled.div`
  margin: auto 20px auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.div`
  background-color: rgb(165, 116, 164);
  height: 4px;
  flex: 1;
  opacity: 0.18;
  :first-child {
    margin-right: 15px;
  }
  :last-child {
    margin-left: 15px;
  }
`;
