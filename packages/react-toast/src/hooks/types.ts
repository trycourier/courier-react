import { ICourierToastMessage } from "../components/Toast/types";
import { IToastConfig } from "../types";

export type ToastCaller = (message: ICourierToastMessage) => void;
export type UseToast = () => [ToastCaller, { config: IToastConfig, clientKey?: string }];

