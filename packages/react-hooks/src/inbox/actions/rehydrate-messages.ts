import { IInboxMessagePreview } from "@trycourier/react-provider";

export type RehydrateMessages = {
  type: "inbox/REHYDRATE_MESSAGES";
  payload: {
    lastMessagesFetched?: number;
    messages?: IInboxMessagePreview[];
    startCursor?: string;
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
