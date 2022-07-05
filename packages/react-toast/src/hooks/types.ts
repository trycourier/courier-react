import { ICourierMessage } from "@trycourier/react-provider";
import { IToastConfig } from "../types";

export type ToastCaller = (message: string | ICourierMessage) => void;
export type UseToast = () => [
  ToastCaller,
  { config: IToastConfig; clientKey?: string }
];
