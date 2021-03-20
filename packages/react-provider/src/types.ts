import { Transport } from "./transports";
export interface ICourierContext {
  apiUrl?: string;
  clientKey?: string;
  dispatch?: (mergeContext: any) => void;
  transport?: Transport;
  userId?: string;
  userSignature?: string;
  wsUrl?: string;
}
