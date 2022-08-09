import { IInbox } from "../types";

export type InboxInit = {
  type: "inbox/INIT";
  payload: IInbox;
};

export const INBOX_INIT = "inbox/INIT";

export const initInbox = (payload: IInbox): InboxInit => ({
  type: INBOX_INIT,
  payload,
});
