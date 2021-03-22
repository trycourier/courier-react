export interface ICourierMessage {
  body?: string;
  icon?: string | false;
  title?: string;
  data?: {
    clickAction?: string;
    clickedUrl?: string;
    readUrl?: string;
    deliveredUrl?: string;
  }
}

export interface ICourierEvent {
  type?: "message",
  data?: ICourierMessage,
}

export type ICourierEventCallback = (params: ICourierEvent) => void;

export type Interceptor = (message?: ICourierMessage) => ICourierMessage | undefined;
