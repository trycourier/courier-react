import styled from "styled-components";

export const Body = styled.div(({ theme }) => ({
  background: "#FFFFFF",
  overflow: "scroll",
  display: "flex",
  maxHeight: "365px",
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
  color: #24324B;
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
  color: #9D3789;
`;

export const Empty = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  color: #73819B;
  margin: auto;
  height: 100%;
`;