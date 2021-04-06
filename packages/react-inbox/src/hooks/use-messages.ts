import { useClient } from "urql";

export const GET_MESSAGES = `
  query ($after: String, $isRead: Boolean){
    messages(params: { isRead: $isRead }, after: $after) {
      totalCount
      pageInfo {
        startCursor
        hasNextPage
      }
      nodes {
        id
        messageId
        created
        read
        content {
          title
          body
          data
          trackingIds {
            clickTrackingId
            deliverTrackingId
            readTrackingId
            unreadTrackingId
          }
        }
      }
    }
  }
`;

const useMessages = () => {
  const client = useClient();

  const fetch = async (variables) => {
    const results = await client.query(GET_MESSAGES, variables).toPromise();

    const messages = results?.data?.messages?.nodes;
    const startCursor = results?.data?.messages?.pageInfo?.startCursor;

    return {
      appendMessages: Boolean(variables?.after),
      messages,
      startCursor,
    };
  };

  return {
    fetch,
  };
};

export default useMessages;
