export const INBOX_FETCH_UNREAD_MESSAGE_COUNT =
  "inbox/FETCH_UNREAD_MESSAGE_COUNT";

export const INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE =
  "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE";

export type FetchUnreadMessageCountDone = {
  type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE";
  payload: {
    count: number;
  };
};

export const fetchUnreadMessageCountDone = (
  payload: FetchUnreadMessageCountDone["payload"]
): FetchUnreadMessageCountDone => ({
  type: INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE,
  payload: payload,
});
