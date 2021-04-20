import styled from "styled-components";
import deepExtend from "deep-extend";

export const MessageList = styled.div(({ theme }) =>
  deepExtend(
    {
      background: "#FFFFFF",
      overflow: "scroll",
      display: "flex",
      height: 365,
      flexDirection: "column",
      borderTop: "1px solid rgba(203,213,224,.5)",
      scrollSnapType: "y proximity",
    },
    theme?.messageList?.container
  )
);

export const Header = styled.div(({ theme }) =>
  deepExtend(
    {
      padding: "18px 20px 12px 20px",
      userSelect: "none",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      display: "flex",
      color: "#24324b",
      justifyContent: "space-between",
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "25px",
    },
    theme.header
  )
);

export const MarkAllAsRead = styled.a`
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

export const Footer = styled.div(({ theme }) =>
  deepExtend(
    {
      alignItems: "center",
      color: "#B9C0CD",
      display: "flex",
      fontSize: "10px",
      fontStyle: "normal",
      fontWeight: "700",
      height: 45,
      justifyContent: "flex-end",
      paddingRight: 18,
    },
    theme.footer
  )
);

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
