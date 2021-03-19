import { Transport } from "./transports";
import { Interceptor } from './transports/types'
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
  subscriptions?: Array<{
   channel: string;
   event: string;
   onEvent?: Interceptor
  }>
  transport?: Transport;
  userId?: string;
  userSignature?: string;
}
