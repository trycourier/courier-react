export type MarkMessageArchived = {
  type: "inbox/MARK_MESSAGE_ARCHIVED";
  payload: {
    messageId: string;
  };
};

export const INBOX_MARK_MESSAGE_ARCHIVED = "inbox/MARK_MESSAGE_ARCHIVED";

export const markMessageArchived = (
  messageId: string
): MarkMessageArchived => ({
  type: INBOX_MARK_MESSAGE_ARCHIVED,
  payload: {
    messageId,
  },
});
