type InboxView = string | "preferences";

export type InboxSetView = {
  type: "inbox/SET_VIEW";
  payload: InboxView;
};

export const INBOX_SET_VIEW = "inbox/SET_VIEW";

export const setView = (view: string | "preferences"): InboxSetView => ({
  type: INBOX_SET_VIEW,
  payload: view,
});
