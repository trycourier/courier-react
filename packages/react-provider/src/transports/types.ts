import { Brand } from "../types";
export interface ITextBlock {
  type: "text";
  text: string;
}
export interface IActionBlock {
  type: "action";
  text: string;
  url: string;
}
export interface ICourierMessage {
  event?: string;
  error?: string;
  body?: string | React.ReactElement;
  blocks?: Array<ITextBlock | IActionBlock>;
  icon?: string | false;
  title?: string | React.ReactElement;
  data?: {
    clickAction?: string;
    clickTrackingId?: string;
    readTrackingId?: string;
    deliverTrackingId?: string;
  };
  brand?: Brand;
}

export interface ICourierEvent {
  type?: "message";
  data?: ICourierMessage;
}

export type ICourierEventCallback = (params: ICourierEvent) => void;

export type Interceptor = (
  message?: ICourierMessage
) => ICourierMessage | undefined;
