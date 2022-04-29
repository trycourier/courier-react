import { Client, createClient } from "urql";
import {
  ICourierClientJWTParams,
  ICourierClientBasicParams,
  CourierBasicHeaders,
  CourierJWTHeaders,
} from "./types";

export const createCourierClient = (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | {
        client?: Client;
        apiUrl?: string;
      }
): Client | undefined => {
  if ("client" in params) {
    return params.client;
  }

  let headers: CourierBasicHeaders | CourierJWTHeaders;

  if ("authorization" in params) {
    headers = {
      "x-courier-client-key": params.clientKey,
      authorization: `Bearer ${params.authorization}`,
    } as CourierJWTHeaders;
  } else {
    const {
      clientKey,
      userId,
      userSignature,
    } = params as ICourierClientBasicParams;

    headers = {
      "x-courier-client-key": clientKey,
      "x-courier-user-id": userId,
    } as CourierBasicHeaders;

    if (userSignature) {
      headers["x-courier-user-signature"] = userSignature;
    }

    if (!clientKey || !userId) {
      return;
    }
  }

  return createClient({
    url: `${
      params.apiUrl || process.env.API_URL || `https://api.courier.com`
    }/client/q`,
    requestPolicy: "network-only",
    fetchOptions: () => {
      return {
        headers,
      };
    },
  });
};
