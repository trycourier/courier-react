import styled from "styled-components";

export const Container = styled.div`
`;

export const Icon = styled.img(props => ({
  flexShrink: "0",
  marginRight: "12.17px",
  objectFit: "contain",
  alignSelf: "center",
  padding: "2px",
  maxHeight: "35px !important",
  maxWidth: "35px !important",
  ...props.theme,
}));

export const Body = styled.div`
  width: 139.33px;
  flex-shrink: 0;
  font-family: Nunito Sans, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-wrap: break-word;
  align-self: center;
`;

export const Title = styled.div(({ theme }) => ({
  fontWeight: 600,
  color: "#344563",
  ...theme,
}));

export const Content = styled.div(({ theme }) => ({
  ...theme,
}));