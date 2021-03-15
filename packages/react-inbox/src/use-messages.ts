import { gql, useQuery } from "@apollo/client";

export const GET_MESSAGES = gql`
  query {
    messages {
      nodes {
        id
        messageId
        created
      }
    }
  }
`;

const useMessages = () => {
  const results = useQuery(GET_MESSAGES);
  return results?.data?.messages?.nodes?.map(message => ({
    messageId: message.messageId,
    created: message.created,
  }));
};

export default useMessages;
