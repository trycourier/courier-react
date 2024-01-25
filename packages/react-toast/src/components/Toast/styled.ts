import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { themeDefaults } from "../../constants";

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
    background: "var(--ci-background)",
    borderRadius: "6px",
    borderBottomLeftRadius:
      theme?.brand?.inapp?.toast?.borderRadius ??
      themeDefaults.inapp.toast.borderRadius,
    borderBottomRightRadius:
      theme?.brand?.inapp?.toast?.borderRadius ??
      themeDefaults.inapp.toast.borderRadius,
    overflow: "visible",
    ...theme?.toast,
  },
  [".Toastify__toast-body"]: {
    margin: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    ...theme?.body,
  },
  [".Toastify__progress-bar"]: {
    background: theme?.brand?.colors?.primary,
    height: 3,
    top: 0,
    zIndex: 25,
    borderTopLeftRadius:
      theme?.brand?.inapp?.toast?.borderRadius ??
      themeDefaults.inapp.toast.borderRadius,
    borderTopRightRadius:
      theme?.brand?.inapp?.toast?.borderRadius ??
      themeDefaults.inapp.toast.borderRadius,
    ...theme?.progressBar,
  },
});

export const ToastStyled = styled(ToastContainer)(toastStyles);
