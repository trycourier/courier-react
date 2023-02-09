import {
  useCourier,
  ICourierMessage,
  registerReducer,
  registerMiddleware,
  Middleware,
} from "@trycourier/react-provider";
import { IInbox, ITab } from "./types";

import {
  Events,
  IGetInboxMessagesParams,
  Inbox,
} from "@trycourier/client-graphql";

import { IGetMessagesParams } from "@trycourier/client-graphql";
import { initInbox } from "./actions/init";
import { toggleInbox } from "./actions/toggle-inbox";
import { setView } from "./actions/set-view";
import { setCurrentTab } from "./actions/set-current-tab";
import { markMessageRead } from "./actions/mark-message-read";
import { markMessageUnread } from "./actions/mark-message-unread";
import { markMessageArchived } from "./actions/mark-message-archived";
import { resetLastFetched } from "./actions/reset-last-fetched";

import {
  rehydrateMessages,
  RehydrateMessages,
} from "./actions/rehydrate-messages";
import { newMessage } from "./actions/new-message";
import { markMessageOpened } from "./actions/mark-message-opened";
import { useEffect } from "react";
import reducer from "./reducer";
import createMiddleware from "./middleware";
import { fetchUnreadMessageCount } from "./actions/fetch-unread-message-count";

export interface IFetchMessagesParams {
  params?: IGetMessagesParams;
  after?: string;
}

interface IInboxActions {
  fetchMessageLists: (tabs?: ITab[]) => void;
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox: IInbox) => void;
  markAllAsRead: () => void;
  markMessageArchived: (
    messageId: string,
    trackingId?: string
  ) => Promise<void>;
  markMessageRead: (messageId: string, trackingId?: string) => Promise<void>;
  markMessageUnread: (messageId: string, trackingId?: string) => Promise<void>;
  markMessageOpened: (messageId: string, trackingId: string) => Promise<void>;
  rehydrateMessages: (payload: RehydrateMessages["payload"]) => void;
  resetLastFetched: () => void;
  setCurrentTab: (newTab: ITab) => void;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
  newMessage: (transportMessage: ICourierMessage) => void;
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

  const events = Events({
    ...clientParams,
    apiUrl,
  });

  const inboxClient = Inbox({
    ...clientParams,
    apiUrl: inboxApiUrl,
  });

  useEffect(() => {
    const inboxMiddleware = createMiddleware({
      events,
      inboxClient,
    });

    registerReducer("inbox", reducer);
    registerMiddleware("inbox", inboxMiddleware as Middleware);
  }, []);

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

    if (payload.isOpen) {
      const searchParams: IGetInboxMessagesParams = {
        ...inbox?.currentTab?.filters,
        from: inbox?.from,
      };

      const meta = {
        tabId: inbox?.currentTab?.id,
        searchParams,
      };

      if (payload.tabs) {
        dispatch({
          type: "inbox/FETCH_MESSAGE_LISTS",
          meta,
          payload: () =>
            inboxClient.getMessageLists(
              payload.tabs?.map((t) => ({
                id: t.id,
                filters: {
                  ...t.filters,
                  status: t.filters.isRead ? "read" : "unread",
                },
              }))
            ),
        });
        return;
      }

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
      dispatch(fetchUnreadMessageCount());
    },
    rehydrateMessages: (payload) => {
      dispatch(rehydrateMessages(payload));
    },
    toggleInbox: (isOpen?: boolean) => {
      dispatch(toggleInbox(isOpen));
    },
    setView: (view: "messages" | "preferences") => {
      dispatch(setView(view));
    },
    setCurrentTab: (newTab: ITab) => {
      if (newTab?.id === inbox?.currentTab?.id) {
        return;
      }

      dispatch(setCurrentTab(newTab));
    },
    fetchMessages: (payload?: IFetchMessagesParams) => {
      const searchParams: IGetInboxMessagesParams = {
        ...payload?.params,
        from: inbox?.from,
      };

      console.log("searchParams", searchParams);

      const meta = {
        tabId: inbox?.currentTab?.id,
        searchParams,
      };

      dispatch({
        meta,
        payload: () =>
          inboxClient.getMessages(meta.searchParams, payload?.after),
        type: "inbox/FETCH_MESSAGES",
      });
    },
    fetchMessageLists: (tabs?: ITab[]) => {
      const listParams = tabs?.map((tab) => ({
        ...tab,
        filters: {
          from: inbox.from,
          ...tab.filters,
        },
      }));

      if (!listParams) {
        return;
      }

      dispatch({
        type: "inbox/FETCH_MESSAGE_LISTS",
        meta: listParams,
        payload: () => inboxClient.getMessageLists(listParams),
      });
    },
    getUnreadMessageCount: handleGetUnreadMessageCount,
    markMessageRead: async (messageId: string, trackingId?: string) => {
      dispatch(markMessageRead(messageId));
      if (trackingId) {
        await events.trackEvent(trackingId);
      }
    },
    markAllAsRead: async () => {
      dispatch({
        type: "inbox/MARK_ALL_READ",
        payload: () => events.trackEventBatch("read"),
      });
    },
    markMessageUnread: async (messageId: string, trackingId?: string) => {
      dispatch(markMessageUnread(messageId));
      if (trackingId) {
        await events.trackEvent(trackingId);
      }
    },
    markMessageOpened: async (messageId: string, trackingId: string) => {
      dispatch(markMessageOpened(messageId));
      await events.trackEvent(trackingId);
    },
    markMessageArchived: async (messageId: string, trackingId?: string) => {
      dispatch(markMessageArchived(messageId));
      if (trackingId) {
        await events.trackEvent(trackingId);
      }
    },
    newMessage: (message: ICourierMessage) => {
      if (!message.messageId) {
        return;
      }

      dispatch(
        newMessage({
          icon: message.icon,
          messageId: message.messageId,
          created: new Date().toISOString(),
          body: message.body,
          blocks: message.blocks,
          title: message.title,
          trackingIds: message.data?.trackingIds,
          data: {
            clickAction: message.data?.clickAction,
          },
        })
      );
    },
  };
};

export default useInboxActions;
