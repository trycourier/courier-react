import { IMessage } from "@trycourier/react-provider";
import { ITab } from "../types";

export type RehydrateMessages = {
  type: "inbox/REHYDRATE_MESSAGES";
  payload: {
    lastMessagesFetched?: number;
    messages?: IMessage[];
    startCursor?: string;
    tabs?: ITab[];
    unreadMessageCount?: number;
  };
};

export const INBOX_REHYDRATE_MESSAGES = "inbox/REHYDRATE_MESSAGES";

export const rehydrateMessages = (
  payload: RehydrateMessages["payload"]
): RehydrateMessages => ({
  type: INBOX_REHYDRATE_MESSAGES,
  payload,
});
