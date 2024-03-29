export type RemoveTag = {
  type: "inbox/REMOVE_TAG";
  payload: {
    tag: string;
    messageId: string;
  };
};

export const INBOX_REMOVE_TAG = "inbox/REMOVE_TAG";

export const removeTag = (messageId: string, tag: string): RemoveTag => ({
  type: INBOX_REMOVE_TAG,
  payload: {
    tag,
    messageId,
  },
});
