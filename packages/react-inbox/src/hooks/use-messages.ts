import { gql, useQuery } from "@apollo/client";

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
  const results = useQuery(GET_MESSAGES);
  return results;
};

export default useMessages;
