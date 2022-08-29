export type MarkMessageRead = {
  type: "inbox/MARK_MESSAGE_READ";
  payload: {
    messageId: string;
  };
};

export const INBOX_MARK_MESSAGE_READ = "inbox/MARK_MESSAGE_READ";

export const markMessageRead = (messageId: string): MarkMessageRead => ({
  type: INBOX_MARK_MESSAGE_READ,
  payload: {
    messageId,
  },
});
