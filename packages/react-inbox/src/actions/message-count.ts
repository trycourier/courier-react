export const GET_UNREAD_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean, $from: Float) {
    messageCount(params: {
      isRead: $isRead,
      from: $from
    })
  }
`;

export interface IMessageCountParams {
  isRead?: boolean;
  from?: number;
}

export const getUnreadMessageCount = async (
  client,
  params?: IMessageCountParams
): Promise<number> => {
  const results = await client.query(GET_UNREAD_MESSAGE_COUNT, params);
  return results?.data?.messageCount;
};
