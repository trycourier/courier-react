import {
  useCourier,
  IInboxMessagePreview,
  registerReducer,
  registerMiddleware,
  Middleware,
} from "@trycourier/react-provider";
import { IInbox } from "./types";

import { IGetInboxMessagesParams, Inbox } from "@trycourier/client-graphql";

import { IGetMessagesParams } from "@trycourier/client-graphql";
import { initInbox } from "./actions/init";
import { toggleInbox } from "./actions/toggle-inbox";
import { setView } from "./actions/set-view";
import { markAllRead } from "./actions/mark-all-read";
import { markMessageRead } from "./actions/mark-message-read";
import { markMessageUnread } from "./actions/mark-message-unread";
import { markMessageArchived } from "./actions/mark-message-archived";
import { resetLastFetched } from "./actions/reset-last-fetched";
import { unpinMessage } from "./actions/unpin-message";

import { newMessage } from "./actions/new-message";
import { markMessageOpened } from "./actions/mark-message-opened";
import { useEffect } from "react";
import reducer from "./reducer";
import createMiddleware from "./middleware";

export interface IFetchMessagesParams {
  params?: IGetMessagesParams;
  after?: string;
}
export interface IInboxActions {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox?: IInbox) => void;
  markAllAsRead: (fromWS?: boolean) => void;
  markMessageArchived: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageOpened: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageRead: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageUnread: (messageId: string, fromWS?: boolean) => Promise<void>;
  newMessage: (transportMessage: IInboxMessagePreview) => void;
  resetLastFetched: () => void;
  setView: (view: string | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
  unpinMessage: (messageId: string, fromWS?: boolean) => Promise<void>;
  trackClick: (messageId: string, trackingId: string) => Promise<void>;
}

const useInboxActions = (): IInboxActions => {
  const {
    apiUrl,
    authorization,
    clientKey,
    clientSourceId,
    dispatch,
    inbox,
    inboxApiUrl,
    onEvent,
    userId,
    userSignature,
  } =
    useCourier<{
      inbox: IInbox;
    }>();

  const clientParams = {
    apiUrl,
    authorization,
    clientSourceId,
    clientKey,
    userId,
    userSignature,
  };

  const inboxClient = Inbox({
    ...clientParams,
    apiUrl: inboxApiUrl,
  });

  useEffect(() => {
    const inboxMiddleware = createMiddleware({
      inboxClient,
    });

    registerReducer("inbox", reducer);
    registerMiddleware("inbox", inboxMiddleware as Middleware);
  }, []);

  const allMessages = [...(inbox?.messages ?? []), ...(inbox?.pinned ?? [])];

  const handleGetUnreadMessageCount: IInboxActions["getUnreadMessageCount"] =
    () => {
      dispatch({
        type: "inbox/FETCH_UNREAD_MESSAGE_COUNT",
        payload: () =>
          inboxClient.getInboxCount({
            from: inbox?.from,
            status: "unread",
          }),
      });
    };

  const handleInit: IInboxActions["init"] = async (payload) => {
    dispatch(initInbox(payload));
    handleGetUnreadMessageCount();

    if (payload?.isOpen || inbox?.isOpen) {
      const searchParams: IGetInboxMessagesParams = {
        from: inbox?.from,
      };

      const meta = {
        searchParams,
      };

      dispatch({
        type: "inbox/FETCH_MESSAGES",
        meta,
        payload: () => inboxClient.getMessages(meta.searchParams),
      });
    }
  };

  return {
    init: handleInit,
    resetLastFetched: () => {
      dispatch(resetLastFetched());
    },
    toggleInbox: (isOpen?: boolean) => {
      dispatch(toggleInbox(isOpen));
    },
    setView: (view: string | "preferences") => {
      dispatch(setView(view));
    },
    fetchMessages: (payload?: IFetchMessagesParams) => {
      const searchParams: IGetInboxMessagesParams = {
        ...payload?.params,
        status: payload?.params?.isRead
          ? "read"
          : payload?.params?.isRead === false
          ? "unread"
          : undefined,
        from: inbox?.from,
      };

      if (typeof (searchParams as any).isRead !== "undefined") {
        delete (searchParams as any).isRead;
      }

      const meta = {
        searchParams,
      };

      dispatch({
        meta,
        payload: () => inboxClient.getMessages(searchParams, payload?.after),
        type: "inbox/FETCH_MESSAGES",
      });
    },
    getUnreadMessageCount: handleGetUnreadMessageCount,
    markAllAsRead: async (fromWS) => {
      dispatch(markAllRead());
      if (!fromWS) {
        await inboxClient.markAllRead();
      }

      if (onEvent) {
        onEvent({
          event: "mark-all-read",
        });
      }
    },
    trackClick: async (messageId, trackingId) => {
      await inboxClient.trackClick(messageId, trackingId);

      if (onEvent) {
        onEvent({
          messageId,
          event: "click",
        });
      }
    },
    markMessageRead: async (messageId: string, fromWS?: boolean) => {
      dispatch(markMessageRead(messageId));
      if (!fromWS) {
        await inboxClient.markRead(messageId);
      }

      if (onEvent) {
        onEvent({
          event: "read",
          message: allMessages.find((m) => m.messageId === messageId),
          messageId,
        });
      }
    },
    markMessageUnread: async (messageId, fromWS) => {
      dispatch(markMessageUnread(messageId));
      if (!fromWS) {
        await inboxClient.markUnread(messageId);
      }

      if (onEvent) {
        onEvent({
          messageId,
          event: "unread",
        });
      }
    },
    markMessageOpened: async (messageId, fromWS) => {
      dispatch(markMessageOpened(messageId));
      if (!fromWS) {
        await inboxClient.markOpened(messageId);
      }

      if (onEvent) {
        onEvent({
          messageId,
          event: "opened",
        });
      }
    },
    markMessageArchived: async (messageId, fromWS) => {
      dispatch(markMessageArchived(messageId));
      if (!fromWS) {
        await inboxClient.markArchive(messageId);
      }

      if (onEvent) {
        onEvent({
          messageId,
          event: "archive",
        });
      }
    },
    unpinMessage: async (messageId, fromWS) => {
      dispatch(unpinMessage(messageId));
      if (!fromWS) {
        await inboxClient.unpinMessage(messageId);
      }

      if (onEvent) {
        onEvent({
          messageId,
          event: "unpin",
        });
      }
    },
    newMessage: (message: IInboxMessagePreview) => {
      dispatch(newMessage(message));
    },
  };
};

export default useInboxActions;
