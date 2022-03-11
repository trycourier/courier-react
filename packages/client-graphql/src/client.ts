import { Client, createClient } from "urql";
import { ICourierClientParams, ICourierHeaders } from "./types";

export const createCourierClient = ({
  clientKey,
  userId,
  userSignature,
  apiUrl,
}: ICourierClientParams): Client => {
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
