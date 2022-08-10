import { IGraphMessageResponse } from "@trycourier/client-graphql";

export const INBOX_FETCH_MESSAGE_LISTS = "inbox/FETCH_MESSAGE_LISTS";

export const INBOX_FETCH_MESSAGE_LISTS_PENDING =
  "inbox/FETCH_MESSAGE_LISTS/PENDING";

export type FetchMessageListsPending = {
  type: "inbox/FETCH_MESSAGE_LISTS/PENDING";
};

export const fetchMessageListsPending = (): FetchMessageListsPending => ({
  type: INBOX_FETCH_MESSAGE_LISTS_PENDING,
});

export const INBOX_FETCH_MESSAGE_LISTS_ERROR =
  "inbox/FETCH_MESSAGE_LISTS/ERROR";

export type FetchMessageListsError = {
  type: "inbox/FETCH_MESSAGE_LISTS/ERROR";
};

export const fetchMessageListsError = (): FetchMessageListsError => ({
  type: INBOX_FETCH_MESSAGE_LISTS_ERROR,
});

export const INBOX_FETCH_MESSAGE_LISTS_DONE = "inbox/FETCH_MESSAGE_LISTS/DONE";

type FetchMessageListsDonePayload = Array<{
  messages: IGraphMessageResponse[];
  startCursor?: string;
}>;

export type FetchMessageListsDone = {
  type: "inbox/FETCH_MESSAGE_LISTS/DONE";
  payload: FetchMessageListsDonePayload;
};

export const fetchMessageListsDone = (
  payload: FetchMessageListsDonePayload
): FetchMessageListsDone => ({
  type: INBOX_FETCH_MESSAGE_LISTS_DONE,
  payload,
});
