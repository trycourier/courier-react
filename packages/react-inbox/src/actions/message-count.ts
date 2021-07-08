export const GET_UNREAD_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean!) {
    messageCount(params: {
      isRead: $isRead
    })
  }
`;

export interface IMessageCountParams {
  isRead: boolean;
}

export const getUnreadMessageCount = async (
  client,
  params?: IMessageCountParams
): Promise<number> => {
  const { isRead = false } = params || {};
  const results = await client.query(GET_UNREAD_MESSAGE_COUNT, { isRead });
  return results?.data?.messageCount;
};
