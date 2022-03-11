import { Client, createClient } from "urql";
import { ICourierClientParams, ICourierHeaders } from "./types";

export const createCourierClient = (params: ICourierClientParams): Client => {
  if ("client" in params) {
    return params.client;
  }

  const { clientKey, userId, apiUrl, userSignature } = params;

  if (!clientKey) {
    throw new Error("Courier: Missing Client Key");
  }

  if (!userId) {
    throw new Error("Courier: Missing User Id");
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
