import { IInboxMessagePreview } from "@trycourier/core";

export type NewMessage = {
  type: "inbox/NEW_MESSAGE";
  payload: IInboxMessagePreview;
};

export const INBOX_NEW_MESSAGE = "inbox/NEW_MESSAGE";

export const newMessage = (message: IInboxMessagePreview): NewMessage => ({
  type: INBOX_NEW_MESSAGE,
  payload: message,
});
