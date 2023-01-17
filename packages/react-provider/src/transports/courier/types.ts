import { WSOptions } from "~/types";
export interface ITransportOptions {
  clientKey?: string;
  clientSourceId: string;
  authorization?: string;
  userSignature?: string;
  wsOptions?: WSOptions;
}
