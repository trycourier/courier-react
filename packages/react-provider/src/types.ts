import { Transport } from "./transports";

export interface ICourierContext {
  clientKey?: string;
  dispatch?: (mergeContext: any) => void;
  transport?: Transport;
  userId?: string;
  userSignature?: string;
}
