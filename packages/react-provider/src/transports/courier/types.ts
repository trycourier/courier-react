import { WSOptions } from "~/types";
export interface ITransportOptions {
  accountId?: string;
  authorization?: string;
  clientKey?: string;
  clientSourceId: string;
  userSignature?: string;
  wsOptions?: WSOptions;
}
