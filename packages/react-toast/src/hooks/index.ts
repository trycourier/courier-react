import { useContext } from "react";
import { ToastContext } from "../providers";
import { UseToast, UseToastConfig } from "./types";
import { IToastContext } from "../providers/types";

export const useToast: UseToast = () => {
  const {toast, config} = useContext(ToastContext) as IToastContext;
  return [toast, { config }];
};

export const useToastConfig: UseToastConfig = () => {
  const {clientKey, config} = useContext(ToastContext) as IToastContext;
  
  return {
    clientKey,
    config,
  };
};

