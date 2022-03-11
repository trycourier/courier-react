import { Client, createClient } from "urql";
import { ICourierClientParams, ICourierHeaders } from "./types";

export const createCourierClient = (
  params: ICourierClientParams
): Client | undefined => {
  if ("client" in params) {
    return params.client;
  }

  const { clientKey, userId, apiUrl, userSignature } = params;

  if (!clientKey || !userId) {
    return;
  }

  return createClient({
    url: `${
      apiUrl || process.env.API_URL || `https://api.courier.com`
    }/client/q`,
    requestPolicy: "network-only",
    fetchOptions: () => {
      const headers: ICourierHeaders & RequestInit["headers"] = {
        "x-courier-client-key": clientKey,
        "x-courier-user-id": userId,
      };

      if (userSignature) {
        headers["x-courier-user-signature"] = userSignature;
      }

      return {
        headers,
      };
    },
  });
};
