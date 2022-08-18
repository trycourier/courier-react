import { IMessage, ITab } from "../types";

export type Rehydratemessages = {
  type: "inbox/REHYDRATE_MESSAGES";
  payload: {
    tabs?: ITab[];
    messages?: IMessage[];
    startCursor?: string;
  };
};

export const INBOX_REHYDRATE_MESSAGES = "inbox/REHYDRATE_MESSAGES";

export const rehydrateMessages = (
  payload: Rehydratemessages["payload"]
): Rehydratemessages => ({
  type: INBOX_REHYDRATE_MESSAGES,
  payload,
});
