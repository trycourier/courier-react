export interface IMessage {
  body?: string;
  icon?: string | false;
  title?: string;
  data?: {
    clickAction?: string;
    clickedUrl?: string;
    deliveredUrl?: string;
  }
}
export interface ICourierEvent {
  type?: "message",
  data: IMessage,
}

export type ICourierEventCallback = (params: ICourierEvent) => void;

export type Interceptor = (message: IMessage) => IMessage | undefined | boolean;
