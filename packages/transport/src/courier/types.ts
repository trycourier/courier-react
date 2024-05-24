import { WSOptions } from "~/types";

export interface IBaseOptions {
  tenantId?: string;
  clientSourceId?: string;
  wsOptions?: WSOptions;
}
export interface IClientKeyOptions extends IBaseOptions {
  clientKey: string;
  userSignature?: string;
}

export interface IJWTOptions extends IBaseOptions {
  authorization: string;
}

export type TransportOptions = IClientKeyOptions | IJWTOptions;
