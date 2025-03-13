import { ErrorEvent } from "reconnecting-websocket";
export type ErrorEventHandler = (event: ErrorEvent) => void;

export type WSOptions = {
  url?: string;
  onError?: ErrorEventHandler;
  onClose?: () => void;
  onReconnect?: () => void;
  connectionTimeout?: number;
};
