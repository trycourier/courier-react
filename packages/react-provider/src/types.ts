import { Transport } from "./transports";

interface IAction {
  type: string;
  payload: any
}
export interface ICourierContext {
  apiUrl?: string;
  clientKey?: string;
  dispatch?: (mergeContext: any) => void;
  reducers?: {
    [key: string]: any;
  };
  registerReducer?: (
    scope: "inbox" | "toast", 
    reducer: (state: any, action: IAction) => void
  ) => void; 
  transport?: Transport;
  userId?: string;
  userSignature?: string;
}
