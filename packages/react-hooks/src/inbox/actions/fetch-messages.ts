import {
  IGetMessagesParams,
  IInboxMessagePreview,
} from "@trycourier/client-graphql";

export const INBOX_FETCH_MESSAGES = "inbox/FETCH_MESSAGES";
export const INBOX_FETCH_MESSAGES_PENDING = "inbox/FETCH_MESSAGES/PENDING";

export type FetchMessagesPending = {
  type: "inbox/FETCH_MESSAGES/PENDING";
};

export const fetchMessagesPending = (): FetchMessagesPending => ({
  type: INBOX_FETCH_MESSAGES_PENDING,
});

export const INBOX_FETCH_MESSAGES_ERROR = "inbox/FETCH_MESSAGES/ERROR";

export type FetchMessagesError = {
  type: "inbox/FETCH_MESSAGES/ERROR";
};

export const fetchMessagesError = (): FetchMessagesError => ({
  type: INBOX_FETCH_MESSAGES_ERROR,
});

export const INBOX_FETCH_MESSAGES_DONE = "inbox/FETCH_MESSAGES/DONE";

interface FetchMessagesDonePayload {
  messages: IInboxMessagePreview[];
  pinned?: IInboxMessagePreview[];
  appendMessages?: boolean;
  startCursor?: string;
}

export type FetchMessagesDone = {
  type: "inbox/FETCH_MESSAGES/DONE";
  meta: {
    tabId?: string;
    searchParams: {
      from?: string;
      filters: IGetMessagesParams;
    };
  };
  payload: FetchMessagesDonePayload;
};

export const fetchMessagesDone = (
  payload: FetchMessagesDonePayload,
  meta: FetchMessagesDone["meta"]
): FetchMessagesDone => ({
  type: INBOX_FETCH_MESSAGES_DONE,
  payload,
  meta,
});
