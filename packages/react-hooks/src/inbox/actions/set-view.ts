type InboxView = "messages" | "preferences";

export type InboxSetView = {
  type: "inbox/SET_VIEW";
  payload: InboxView;
};

export const INBOX_SET_VIEW = "inbox/SET_VIEW";

export const setView = (view: "messages" | "preferences"): InboxSetView => ({
  type: INBOX_SET_VIEW,
  payload: view,
});
