import { IMessage } from "@trycourier/react-provider";

export type NewMessage = {
  type: "inbox/NEW_MESSAGE";
  payload: IMessage;
};

export const INBOX_NEW_MESSAGE = "inbox/NEW_MESSAGE";

export const newMessage = (message: IMessage): NewMessage => ({
  type: INBOX_NEW_MESSAGE,
  payload: message,
});
