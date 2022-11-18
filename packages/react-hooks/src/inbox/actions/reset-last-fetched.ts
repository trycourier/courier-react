export type ResetLastFetched = {
  type: "inbox/RESET_LAST_FETCHED";
};

export const INBOX_RESET_LAST_FETCHED = "inbox/RESET_LAST_FETCHED";

export const resetLastFetched = (): ResetLastFetched => ({
  type: INBOX_RESET_LAST_FETCHED,
});
