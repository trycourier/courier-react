import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const useGraphqlClient = (clientKey?: string, userId?: string, userSignature?: string) => {
  const client = useMemo(() => {
    if (!clientKey || !userId) {
      return;
    }

    return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.API_URL ?? `https://api.courier.com`}/client/q`,
      fetch: async (uri, options) => {
        const headers = {
          ...options?.headers,
          "x-courier-client-key": clientKey,
          "x-courier-user-id": userId,
        }

        if (userSignature) {
          headers["x-courier-user-signature"] = userSignature;
        }

        return fetch(uri, {
          ...options,
          headers,
        });
      },
    }),
    })
  }, [clientKey, userId, userSignature]) ;

  return client;
}
