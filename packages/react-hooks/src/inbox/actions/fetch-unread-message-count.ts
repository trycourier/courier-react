export const INBOX_FETCH_UNREAD_MESSAGE_COUNT =
  "inbox/FETCH_UNREAD_MESSAGE_COUNT";

export type FetchUnreadMessageCount = {
  type: "inbox/FETCH_UNREAD_MESSAGE_COUNT";
};

export const fetchUnreadMessageCount = (): FetchUnreadMessageCount => ({
  type: INBOX_FETCH_UNREAD_MESSAGE_COUNT,
});

export const INBOX_FETCH_UNREAD_MESSAGE_COUNT_PENDING =
  "inbox/FETCH_UNREAD_MESSAGE_COUNT/PENDING";

export type FetchUnreadMessageCountPending = {
  type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/PENDING";
};

export const fetchUnreadMessageCountPending =
  (): FetchUnreadMessageCountPending => ({
    type: INBOX_FETCH_UNREAD_MESSAGE_COUNT_PENDING,
  });

export const INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE =
  "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE";

export type FetchUnreadMessageCountDone = {
  type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE";
  payload: number;
};

export const fetchUnreadMessageCountDone = (
  unreadMessageCount: number
): FetchUnreadMessageCountDone => ({
  type: INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE,
  payload: unreadMessageCount,
});
