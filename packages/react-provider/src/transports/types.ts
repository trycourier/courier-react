export interface ICourierMessage {
  body?: string;
  icon?: string | false;
  title?: string;
  data?: {
    clickAction?: string;
    clickTrackingId?: string;
    readTrackingId?: string;
    deliverTrackingId?: string;
  }
}

export interface ICourierEvent {
  type?: "message",
  data?: ICourierMessage,
}

export type ICourierEventCallback = (params: ICourierEvent) => void;

export type Interceptor = (message?: ICourierMessage) => ICourierMessage | undefined;
