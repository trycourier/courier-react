export interface IGetMessagesParams {
  after?: string;
  isRead?: boolean;
}

export const QUERY_MESSAGES = `
  query GetMessages($after: String, $isRead: Boolean){
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

export const getMessages = async (
  client,
  { isRead, after }: IGetMessagesParams
) => {
  const results = await client.query(QUERY_MESSAGES, { isRead, after });

  const messages = results?.data?.messages?.nodes;
  const startCursor = results?.data?.messages?.pageInfo?.startCursor;
  return {
    appendMessages: Boolean(after),
    messages,
    startCursor,
  };
};
