export type MarkMessageUnread = {
  type: "inbox/MARK_MESSAGE_UNREAD";
  payload: {
    messageId: string;
  };
};

export const INBOX_MARK_MESSAGE_UNREAD = "inbox/MARK_MESSAGE_UNREAD";

export const markMessageUnread = (messageId: string): MarkMessageUnread => ({
  type: INBOX_MARK_MESSAGE_UNREAD,
  payload: {
    messageId,
  },
});
