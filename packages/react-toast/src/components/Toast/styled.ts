import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const toastStyles = ({ theme }) => ({
  ["&.Toastify__toast-container"]: {
    "&, *": {
      fontFamily: `'Nunito Sans', sans-serif`,
      boxSizing: "border-box",
    },
    ...theme?.root,
  },
  [".Toastify__toast"]: {
    width: 320,
    minHeight: 65,
    padding: 0,
    borderRadius: "6px",
    borderBottomLeftRadius: theme?.brand?.inapp?.toast?.borderRadius ?? "6px",
    borderBottomRightRadius: theme?.brand?.inapp?.toast?.borderRadius ?? "6px",
    overflow: "visible",
    ...theme?.toast,
  },
  [".Toastify__toast-body"]: {
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    ...theme?.body,
  },
  [".Toastify__progress-bar"]: {
    background: theme?.brand?.colors?.primary ?? "#9121C2",
    height: 3,
    top: 0,
    zIndex: 25,
    borderTopLeftRadius: theme?.brand?.inapp?.toast?.borderRadius ?? "6px",
    borderTopRightRadius: theme?.brand?.inapp?.toast?.borderRadius ?? "6px",
    ...theme?.progressBar,
  },
});

export const ToastStyled = styled(ToastContainer)(toastStyles);
