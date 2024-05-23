import { WSOptions } from "~/types";
export interface ITransportOptions {
  tenantId?: string;
  authorization?: string;
  clientKey?: string;
  clientSourceId: string;
  userSignature?: string;
  wsOptions?: WSOptions;
}
