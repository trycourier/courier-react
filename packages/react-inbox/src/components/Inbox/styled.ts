import styled from "styled-components";

export const Container = styled.div<{show: boolean}>(({ theme, show }) => ({
  backgroundColor: "white",
  boxShadow: "rgba(157, 55, 137, 0.2) 0px 4px 12px",
  maxWidth: 400,
  borderRadius: 20,
  overflow: "hidden",
  opacity: show ? 1 : 0,
  visibility: show ? "visible" : "hidden",
  transition: "all .1s ease-in-out",
  ...theme.root,
}));

export const Title = styled.div(({ theme }) => ({
  color: "rgb(52, 69, 99)",
  fontSize: "16px",
  fontWeight: "bold",
  userSelect: "none",
  ...theme.title,
}));

export const Body = styled.div(({ theme }) => ({
  "display": "flex",
  "flexDirection": "column",
  "marginTop": "20px",
  "marginBottom": "5px",
  "&>*": {
    "paddingBottom": "15px",
    "marginBottom": "15px",
    "boxShadow": "0 .25px rgba(0, 0, 0, .4)",
    "&:last-child": {
      boxShadow: "none",
    },
  },
  ...theme.body,
}));

export const Footer = styled.div(({ theme }) => ({
  "backgroundColor": "rgb(251, 251, 251)",
  "borderTop": "1px solid rgb(234, 238, 240)",
  "justifyContent": "center",
  "display": "flex",
  "height": "38px",
  "alignItems": "center",
  "img": {
    filter: "grayscale(100%)",
    height: "20px",
    width: "20px",
  },
  ...theme.footer,
}));

export const Header = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  borderBottom: "2px solid rgb(157, 55, 137)",
  position: "relative",
  ...theme.header,
}));

export const Close = styled.img(({ theme }) => ({
  cursor: "pointer",
  height: "14px",
  width: "14px",
  position: "absolute",
  right: "20px",
  userSelect: "none",
  ...theme.close,
}));

export const SubTitle = styled.div(({ theme }) => ({
  marginTop: "20px",
  marginLeft: "20px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "rgb(143, 143, 143)",
  userSelect: "none",
  ...theme.subTitle,
}));
