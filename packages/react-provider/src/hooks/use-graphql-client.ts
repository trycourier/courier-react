import { useMemo } from "react";
import { createClient } from "urql";
import useCourier from "./use-courier";

export default () => {
  const { clientKey, userId, userSignature, apiUrl } = useCourier();

  const client = useMemo(() => {
    return createClient({
      url: `${
        apiUrl ?? process.env.API_URL ?? `https://api.courier.com`
      }/client/q`,
      requestPolicy: "network-only",
      fetchOptions: () => {
        const headers = {
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
  }, [apiUrl, clientKey, userId, userSignature]);

  return client;
};
