import { useCourier } from "@trycourier/react-provider";
import { IInbox, ITab } from "./types";

import {
  createCourierClient,
  Events,
  InitialState,
  Messages,
} from "@trycourier/client-graphql";

import { IGetMessagesParams } from "@trycourier/client-graphql";
import { initInbox } from "./actions/init";
import { toggleInbox } from "./actions/toggle-inbox";
import { setView } from "./actions/set-view";
import { setCurrentTab } from "./actions/set-current-tab";
import { markMessageRead } from "./actions/mark-message-read";
import { markAllRead } from "./actions/mark-all-read";
import { markMessageUnread } from "./actions/mark-message-unread";
import { markMessageArchived } from "./actions/mark-message-archived";
import {
  rehydrateMessages,
  Rehydratemessages,
} from "./actions/rehydrate-messages";

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
  markMessageArchived: (messageId: string, trackingId: string) => Promise<void>;
  markMessageRead: (messageId: string, trackingId: string) => Promise<void>;
  markMessageUnread: (messageId: string, trackingId: string) => Promise<void>;
  rehydrateMessages: (payload: Rehydratemessages["payload"]) => void;
  setCurrentTab: (newTab: ITab) => void;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
}

const useInboxActions = (): IInboxActions => {
  const {
    apiUrl,
    clientKey,
    dispatch,
    inbox,
    userId,
    userSignature,
    brandId,
    brand,
  } =
    useCourier<{
      inbox: IInbox;
    }>();

  const courierClient = createCourierClient({
    apiUrl,
    clientKey,
    userId,
    userSignature,
  });

  const events = Events({ client: courierClient });
  const messages = Messages({ client: courierClient });
  const initialState = InitialState({ client: courierClient });

  return {
    init: async (payload) => {
      dispatch(initInbox(payload));

      const response = await initialState.getInitialState({
        brandId: brandId,
        skipFetchBrand: Boolean(brand),
      });

      if (response?.brand) {
        dispatch({
          type: "root/GET_BRAND/DONE",
          payload: response.brand,
        });
      }

      dispatch({
        type: "inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE",
        payload: response?.unreadMessageCount,
      });

      if (payload.isOpen) {
        const meta = {
          tabId: inbox?.currentTab?.id,
          searchParams: {
            ...inbox?.currentTab?.filters,
            from: inbox?.from,
          },
        };

        if (payload.tabs) {
          dispatch({
            type: "inbox/FETCH_MESSAGE_LISTS",
            meta,
            payload: () => messages.getMessageLists(payload.tabs),
          });
          return;
        }

        dispatch({
          type: "inbox/FETCH_MESSAGES",
          meta,
          payload: () => messages.getMessages(meta.searchParams),
        });
      }
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
      const meta = {
        tabId: inbox?.currentTab?.id,
        searchParams: {
          ...payload?.params,
          from: inbox?.from,
        },
      };

      dispatch({
        meta,
        payload: () => messages.getMessages(meta.searchParams, payload?.after),
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
        payload: () => messages.getMessageLists(listParams),
      });
    },
    getUnreadMessageCount: () => {
      dispatch({
        type: "inbox/FETCH_UNREAD_MESSAGE_COUNT",
        payload: () =>
          messages.getMessageCount({
            from: inbox?.from,
            isRead: false,
          }),
      });
    },
    markMessageRead: async (messageId: string, trackingId: string) => {
      dispatch(markMessageRead(messageId));
      await events.trackEvent(trackingId);
    },
    markAllAsRead: async () => {
      dispatch(markAllRead());
      await events.trackEventBatch("read");
    },
    markMessageUnread: async (messageId: string, trackingId: string) => {
      dispatch(markMessageUnread(messageId));
      await events.trackEvent(trackingId);
    },
    markMessageArchived: async (messageId: string, trackingId: string) => {
      dispatch(markMessageArchived(messageId));
      await events.trackEvent(trackingId);
    },
  };
};

export default useInboxActions;
