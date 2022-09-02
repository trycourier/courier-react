import { IElementalInboxMessagePreview } from "../types";

export type NewMessage = {
  type: "inbox/NEW_MESSAGE";
  payload: IElementalInboxMessagePreview;
};

export const INBOX_NEW_MESSAGE = "inbox/NEW_MESSAGE";

export const newMessage = (
  message: IElementalInboxMessagePreview
): NewMessage => ({
  type: INBOX_NEW_MESSAGE,
  payload: message,
});
