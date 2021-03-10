import { IToastMessage } from "../components/Toast/types";
import { IProviderConfig } from "../providers/types";

export type ToastCaller = (message: IToastMessage) => void;
export type ToastConfig = { config: IProviderConfig};
export type UseToast = () => [ToastCaller, ToastConfig];
export type UseToastConfig = () => {
  config: IProviderConfig;
  clientKey: string;
};

