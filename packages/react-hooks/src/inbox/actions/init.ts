import { IInbox } from "../types";

export type InboxInit<T = IInbox> = {
  type: "inbox/INIT";
  payload: T;
};

export const INBOX_INIT = "inbox/INIT";

export function initInbox<T = IInbox>(payload: T): InboxInit<T> {
  return {
    type: INBOX_INIT,
    payload,
  };
}
