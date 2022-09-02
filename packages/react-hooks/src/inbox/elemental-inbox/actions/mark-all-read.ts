export type MarkAllRead = {
  type: "inbox/MARK_ALL_READ";
};

export const INBOX_MARK_ALL_READ = "inbox/MARK_ALL_READ";

export const markAllRead = (): MarkAllRead => ({
  type: INBOX_MARK_ALL_READ,
});
