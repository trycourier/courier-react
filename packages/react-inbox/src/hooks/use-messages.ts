import { gql, useQuery } from "@apollo/client";
import { useGraphQlClient } from '@trycourier/react-provider';

export const GET_MESSAGES = gql`
  query {
    messages {
      nodes {
        id
        messageId
        created
        content {
          title
          body
          data
        }
      }
    }
  }
`;

const useMessages = () => {
  const graphQlClient = useGraphQlClient();

  const results = useQuery(GET_MESSAGES, {
    client: graphQlClient,
  });
  return results;
};

export default useMessages;
