export interface ICourierMessage {
  body?: string | React.ReactElement;
  icon?: string | false;
  title?: string | React.ReactElement;
  data?: {
    clickAction?: string;
    clickTrackingId?: string;
    readTrackingId?: string;
    deliverTrackingId?: string;
  };
}

export interface ICourierEvent {
  type?: "message";
  data?: ICourierMessage;
}

export type ICourierEventCallback = (params: ICourierEvent) => void;

export type Interceptor = (
  message?: ICourierMessage
) => ICourierMessage | undefined;
