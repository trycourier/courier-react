import styled, { createGlobalStyle } from "styled-components";
import tippyCss from "tippy.js/dist/tippy.css";
import LazyTippy from "./LazyTippy";

export const Container = styled.div``;

export const GlobalStyle = createGlobalStyle`
  ${tippyCss}

  @keyframes badge-pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(222, 80, 99, 0.3);
      box-shadow: 0 0 0 0 rgba(222, 80, 99, 0.3);
    }
    10% {
        -moz-box-shadow: 0 0 0 10px rgba(222, 80, 99, 0);
        box-shadow: 0 0 0 10px rgba(222, 80, 99, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(222, 80, 99, 0);
        box-shadow: 0 0 0 0 rgba(222, 80, 99, 0);
    }
  }
`;

export const StyledTippy = styled(LazyTippy)(({ theme }) => ({
  fontFamily: `"Nunito", sans-serif`,
  background: "#FFFFFF !important",
  backgroundColor: "#FFFFFF !important",
  boxShadow: "0px 12px 32px rgba(86, 43, 85, 0.3)",
  color: "black !important",
  minWidth: 483,
  maxHeight: 545,
  borderRadius: "20px !important",

  ".tippy-content": {
    padding: 0,
    maxHeight: 545,
    display: "flex",
    flexDirection: "column",
    "> div": {
      flex: 1,
      maxHeight: 545,
    },
  },

  ".tippy-arrow": {
    color: "#f9fafb",
  },

  ...theme.root,
}));
