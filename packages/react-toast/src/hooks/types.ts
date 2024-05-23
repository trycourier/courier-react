import { IInboxMessagePreview } from "@trycourier/core";
import { IToastConfig } from "../types";

export type ToastCaller = (
  message:
    | string
    | IInboxMessagePreview
    | {
        preview?: string;
        title?: string;
      }
) => void;
export type UseToast = () => [
  ToastCaller,
  { config: IToastConfig; clientKey?: string }
];
