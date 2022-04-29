import { Client } from "urql";

export type ICourierClientBasicParams = {
  client?: Client;
  clientKey: string;
  userId: string;
  userSignature?: string;
  apiUrl?: string;
};

export type ICourierClientJWTParams = {
  client?: Client;
  authorization: string;
  clientKey: string;
  apiUrl?: string;
};

export type ICourierClientParams =
  | ICourierClientBasicParams
  | ICourierClientJWTParams;

export type CourierBasicHeaders = RequestInit["headers"] & {
  "x-courier-client-key": string;
  "x-courier-user-id": string;
  "x-courier-user-signature"?: string;
};

export type CourierJWTHeaders = RequestInit["headers"] & {
  "x-courier-client-key": string;
  authorization: string;
};
