export const GET_UNREAD_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean!) {
    messageCount(params: {
      isRead: $isRead
    })
  }
`;

export const getUnreadMessageCount = async (client, { isRead = false }) => {
  const results = await client.query(GET_UNREAD_MESSAGE_COUNT, { isRead });
  return results?.data?.messageCount;
};
