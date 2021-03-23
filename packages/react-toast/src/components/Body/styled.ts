import styled from "styled-components";


export const Icon = styled.img(({ theme }) => ({
  flexShrink: "0",
  marginLeft: 12,
  marginRight: 12,
  objectFit: "contain",
  alignSelf: "center",
  padding: "2px",
  maxHeight: "35px !important",
  maxWidth: "35px !important",
  ...theme?.icon,
}));

export const Message = styled.div`
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

export const Body = styled.div(({ theme }) => ({
  ...theme?.body,
}));


export const Title = styled.div(({ theme }) => ({
  fontWeight: 600,
  color: "#344563",
  ...theme?.title,
}));

