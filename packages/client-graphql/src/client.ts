import { Client, createClient } from "urql";
import {
  ICourierClientJWTParams,
  ICourierClientBasicParams,
  CourierBasicHeaders,
  CourierJWTHeaders,
} from "./types";
import packageJson from "../package.json";

export const createCourierClient = (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | {
        client?: Client;
        apiUrl?: string;
      },
  defaults?: {
    apiUrl?: string;
  }
): Client | undefined => {
  if ("client" in params) {
    return params.client;
  }

  let headers: CourierBasicHeaders | CourierJWTHeaders;

  if ("authorization" in params) {
    headers = {
      "x-courier-client-platform": "nodejs",
      "x-courier-client-version": packageJson.version,
      authorization: `Bearer ${params.authorization}`,
    } as CourierJWTHeaders;
  } else {
    const { clientKey, userId, userSignature } =
      params as ICourierClientBasicParams;

    headers = {
      "x-courier-client-key": clientKey,
      "x-courier-client-platform": "nodejs",
      "x-courier-client-version": packageJson.version,
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
    url:
      params.apiUrl ||
      defaults?.apiUrl ||
      `${process.env.API_URL || `https://api.courier.com`}/client/q`,
    requestPolicy: "network-only",
    fetchOptions: () => {
      return {
        headers,
      };
    },
  });
};
