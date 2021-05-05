export interface CourierMessage {
  body?: string;
  icon?: string | false;
  title?: string;
  data?: {
    clickAction?: string;
    clickTrackingId?: string;
    readTrackingId?: string;
    deliverTrackingId?: string;
  };
}

export interface ICourierEvent {
  type?: "message";
  data?: CourierMessage;
}

export type ICourierEventCallback = (params: ICourierEvent) => void;

export type Interceptor = (
  message?: CourierMessage
) => CourierMessage | undefined;
