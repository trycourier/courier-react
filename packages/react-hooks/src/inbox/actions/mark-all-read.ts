export type MarkAllRead = {
  type: "inbox/MARK_ALL_READ";
};

export type MarkAllReadPending = {
  type: "inbox/MARK_ALL_READ/PENDING";
};

export type MarkAllReadError = {
  type: "inbox/MARK_ALL_READ/ERROR";
};

export type MarkAllReadDone = {
  type: "inbox/MARK_ALL_READ/DONE";
  payload: {
    ids: string[];
  };
};

export const INBOX_MARK_ALL_READ = "inbox/MARK_ALL_READ";
export const INBOX_MARK_ALL_READ_PENDING = "inbox/MARK_ALL_READ/PENDING";
export const INBOX_MARK_ALL_READ_DONE = "inbox/MARK_ALL_READ/DONE";
export const INBOX_MARK_ALL_READ_ERROR = "inbox/MARK_ALL_READ/ERROR";

export const markAllRead = (): MarkAllRead => ({
  type: INBOX_MARK_ALL_READ,
});

export const markAllReadPending = (): MarkAllReadPending => ({
  type: INBOX_MARK_ALL_READ_PENDING,
});

export const markAllReadError = (): MarkAllReadError => ({
  type: INBOX_MARK_ALL_READ_ERROR,
});

interface MarkAllReadDonePayload {
  ids: string[];
}

export const markAllReadDone = (
  payload: MarkAllReadDonePayload
): MarkAllReadDone => ({
  type: INBOX_MARK_ALL_READ_DONE,
  payload,
});
