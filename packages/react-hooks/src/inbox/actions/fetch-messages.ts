import { IGraphMessageResponse } from "@trycourier/client-graphql";

export const INBOX_FETCH_MESSAGES = "inbox/INBOX_FETCH_MESSAGES";

export const INBOX_FETCH_MESSAGES_PENDING =
  "inbox/INBOX_FETCH_MESSAGES/PENDING";

export type FetchMessagesPending = {
  type: "inbox/INBOX_FETCH_MESSAGES/PENDING";
};

export const fetchMessagesPending = (): FetchMessagesPending => ({
  type: INBOX_FETCH_MESSAGES_PENDING,
});

export const INBOX_FETCH_MESSAGES_ERROR = "inbox/INBOX_FETCH_MESSAGES/ERROR";

export type FetchMessagesError = {
  type: "inbox/INBOX_FETCH_MESSAGES/ERROR";
};

export const fetchMessagesError = (): FetchMessagesError => ({
  type: INBOX_FETCH_MESSAGES_ERROR,
});

export const INBOX_FETCH_MESSAGES_DONE = "inbox/INBOX_FETCH_MESSAGES/DONE";

interface FetchMessagesDonePayload {
  messages: IGraphMessageResponse[];
  appendMessages?: boolean;
  startCursor?: string;
}

export type FetchMessagesDone = {
  type: "inbox/INBOX_FETCH_MESSAGES/DONE";
  payload: FetchMessagesDonePayload;
};

export const fetchMessagesDone = (
  payload: FetchMessagesDonePayload
): FetchMessagesDone => ({
  type: INBOX_FETCH_MESSAGES_DONE,
  payload,
});
