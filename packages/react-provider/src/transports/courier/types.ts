import { ErrorEvent } from "reconnecting-websocket";
export interface ITransportOptions {
  clientKey: string;
  userSignature?: string;
  wsOptions?: {
    url?: string;
    connectionTimeout?: number;
    onError?: (event: ErrorEvent) => void;
  };
}
