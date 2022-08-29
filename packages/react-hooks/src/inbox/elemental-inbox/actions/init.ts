import { IElementalInbox } from "../types";

export type InboxInit = {
  type: "inbox/INIT";
  payload: IElementalInbox;
};

export const INBOX_INIT = "inbox/INIT";

export const initInbox = (payload: IElementalInbox): InboxInit => ({
  type: INBOX_INIT,
  payload,
});
