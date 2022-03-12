import { Client } from "urql";

export type ICourierClientParams = {
  client?: Client;
  clientKey?: string;
  userId?: string;
  userSignature?: string;
  apiUrl?: string;
};

export interface ICourierHeaders {
  "x-courier-client-key": string;
  "x-courier-user-id": string;
  "x-courier-user-signature"?: string;
}
