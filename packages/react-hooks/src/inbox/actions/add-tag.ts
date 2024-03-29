export type AddTag = {
  type: "inbox/ADD_TAG";
  payload: {
    tag: string;
    messageId: string;
  };
};

export const INBOX_ADD_TAG = "inbox/ADD_TAG";

export const addTag = (messageId: string, tag: string): AddTag => ({
  type: INBOX_ADD_TAG,
  payload: {
    tag,
    messageId,
  },
});
