import { Transport } from "./transports";

export interface ICourierContext {
  clientKey: string;
  userSignature?: string;
  transport: Transport;
  setContext?: (mergeContext: any) => void;
}
