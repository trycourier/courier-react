export type MarkMessageOpened = {
  type: "inbox/MARK_MESSAGE_OPENED";
  payload: {
    messageId: string;
  };
};

export const INBOX_MARK_MESSAGE_OPENED = "inbox/MARK_MESSAGE_OPENED";

export const markMessageOpened = (messageId: string): MarkMessageOpened => ({
  type: INBOX_MARK_MESSAGE_OPENED,
  payload: {
    messageId,
  },
});
