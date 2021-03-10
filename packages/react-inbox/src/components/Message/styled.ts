import styled from "styled-components";

export const Root = styled.button<{read?: boolean}>(({ theme }) => ({
  display: "flex",
  cursor: "pointer",
  outline: "none",
  border: "none",
  backgroundColor: "initial",
  position: "relative",
  ...theme.message?.root,
}));


export const ReadIndicator = styled.div(({ theme }) => ({
  backgroundColor: "rgba(157, 55, 137, .5)",
  height: "50px",
  width: "2px",
  position: "absolute",
  left: "0",
  ...theme.message?.read,
}));

export const Title = styled.div(({ theme }) => ({
  color: "rgb(52, 69, 99)",
  fontSize: "16px",
  lineHeight: "15px",
  fontWeight: "bold",
  ...theme.message?.title,
}));

export const Container = styled.div(({ theme }) => ({
  margin: "0 20px",
  ...theme.message?.container,
}));

export const Body = styled.div(({ theme }) => ({
  marginTop: "2px",
  fontSize: "12px",
  ...theme.message?.body,
}));

export const Icon = styled.img(({ theme }) => ({
  objectFit: "contain",
  height: "40px",
  width: "40px",
  flexShrink: "0",
  padding: "5px",
  backgroundColor: "rgb(249, 249, 249)",
  borderRadius: "50%",
  marginLeft: "10px",
  ...theme.message?.icon,
}));
