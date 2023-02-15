import {
  useCourier,
  ICourierMessage,
  registerReducer,
  registerMiddleware,
  Middleware,
} from "@trycourier/react-provider";
import { IInbox, ITab } from "./types";

import { IGetInboxMessagesParams, Inbox } from "@trycourier/client-graphql";

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
  markMessageArchived: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageRead: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageUnread: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageOpened: (messageId: string, fromWS?: boolean) => Promise<void>;
  rehydrateMessages: (payload: RehydrateMessages["payload"]) => void;
  resetLastFetched: () => void;
  setCurrentTab: (newTab: ITab) => void;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
  newMessage: (transportMessage: ICourierMessage) => void;
}

const tabsToFilters = (tabs?: ITab[], from?: number) => {
  return tabs?.map((tab) => {
    const filters: {
      from?: number;
      status?: "read" | "unread";
    } = {
      from,
      status:
        tab.filters.isRead === false
          ? "unread"
          : tab.filters.isRead === true
          ? "read"
          : undefined,
      ...tab.filters,
    };

    if ((filters as any).isRead) {
      delete (filters as any).isRead;
    }

    return {
      ...tab,
      filters,
    };
  });
};

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
              tabsToFilters(payload.tabs, inbox.from)
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
      const listParams = tabsToFilters(tabs, inbox.from);

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
    markAllAsRead: async () => {
      dispatch({
        type: "inbox/MARK_ALL_READ",
        payload: () => inboxClient.markAllRead(),
      });
    },
    markMessageRead: async (messageId: string, fromWS?: boolean) => {
      dispatch(markMessageRead(messageId));
      if (!fromWS) {
        await inboxClient.markRead(messageId);
      }
    },
    markMessageUnread: async (messageId: string, fromWS?: boolean) => {
      dispatch(markMessageUnread(messageId));
      if (!fromWS) {
        await inboxClient.markUnread(messageId);
      }
    },
    markMessageOpened: async (messageId: string, fromWS?: boolean) => {
      dispatch(markMessageOpened(messageId));
      if (!fromWS) {
        await inboxClient.markOpened(messageId);
      }
    },
    markMessageArchived: async (messageId: string, fromWS?: boolean) => {
      dispatch(markMessageArchived(messageId));
      if (!fromWS) {
        await inboxClient.markArchive(messageId);
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
