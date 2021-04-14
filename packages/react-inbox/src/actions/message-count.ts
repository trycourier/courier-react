export const QUERY_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean!) {
    messageCount(params: {
      isRead: $isRead
    })
  }
`;

export const getMessageCount = async (client, { isRead = false }) => {
  const results = await client.query(QUERY_MESSAGE_COUNT, { isRead });
  return results?.data?.messageCount;
};
