import { Client, createClient } from "urql";

export class GraphQLClient {
  client: Client;
  canRequest: boolean;

  constructor({ clientKey, userId, userSignature, apiUrl }) {
    this.canRequest = Boolean(clientKey && userId);

    this.client = createClient({
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
  }

  query(queryString, variables) {
    if (!this.canRequest) {
      return;
    }

    return this.client.query(queryString, variables).toPromise();
  }

  mutate(mutateString, variables) {
    if (!this.canRequest) {
      return;
    }
    return this.client.mutation(mutateString, variables).toPromise();
  }
}

export default GraphQLClient;
