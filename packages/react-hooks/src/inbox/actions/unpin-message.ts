export type UnpinMessage = {
  type: "inbox/UNPIN_MESSAGE";
  payload: {
    messageId: string;
  };
};

export const INBOX_UNPIN_MESSAGE = "inbox/UNPIN_MESSAGE";

export const unpinMessage = (messageId: string): UnpinMessage => ({
  type: INBOX_UNPIN_MESSAGE,
  payload: {
    messageId,
  },
});
