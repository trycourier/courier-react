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
          blocks {
            ... on TextBlock {
              type
              text
            }
            ... on ActionBlock {
              type
              text
              url
            }
          }
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

export const getMessages = async (client, params?: IGetMessagesParams) => {
  const results = await client.query(QUERY_MESSAGES, params);

  const messages = results?.data?.messages?.nodes;
  const startCursor = results?.data?.messages?.pageInfo?.startCursor;
  return {
    appendMessages: Boolean(params?.after),
    messages,
    startCursor,
  };
};
