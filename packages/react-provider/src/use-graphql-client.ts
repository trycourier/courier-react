import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const useGraphqlClient = (clientKey?: string, userId?: string, userSignature?: string) => {
  const client = useMemo(() => {
    if (!clientKey || !userId) {
      return;
    }

    return new ApolloClient({
      // https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-704451917
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: new HttpLink({
      uri: `https://rubmz24skk.execute-api.us-east-1.amazonaws.com/dev/client/q`,
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
