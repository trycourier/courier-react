import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const ToastStyled = styled(ToastContainer)(({ theme }) => ({
  ["&.Toastify__toast-container"]: theme.root,
  [".Toastify__toast"]: theme.toast,
  [".Toastify__toast-body"]: theme.body,
  [".Toastify__progress-bar"]: theme.progressBar,
}));