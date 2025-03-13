require("isomorphic-fetch");

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
      },
  defaults?: {
    apiUrl?: string;
  }
): Client | undefined => {
  if ("client" in params) {
    return params.client;
  }

  let headers: CourierBasicHeaders | CourierJWTHeaders;
  const jwtParams = params as ICourierClientJWTParams;

  if (jwtParams.authorization) {
    headers = {
      authorization: `Bearer ${jwtParams.authorization}`,
      "x-courier-client-key": jwtParams.clientKey,
    } as CourierJWTHeaders;

    if (jwtParams.clientSourceId) {
      headers["x-courier-client-source-id"] = jwtParams.clientSourceId;
    }
  } else {
    const { clientKey, userId, userSignature, clientSourceId } =
      params as ICourierClientBasicParams;

    headers = {
      "x-courier-client-key": clientKey,
      "x-courier-user-id": userId,
    } as CourierBasicHeaders;

    if (clientSourceId) {
      headers["x-courier-client-source-id"] = clientSourceId;
    }

    if (userSignature) {
      headers["x-courier-user-signature"] = userSignature;
    }

    if (!clientKey || !userId) {
      return;
    }
  }

  /* 
  riley todo - 
  turing this off for now because the way we made typescript happy before
  broke our typings so we will need a better way to do this in the future
  
  add client version and platform
  headers = {
    ...headers,
    "x-courier-client-version": package.version,
  };
  */

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
