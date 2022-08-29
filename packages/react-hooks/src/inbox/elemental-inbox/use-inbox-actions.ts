import { useCourier } from "@trycourier/react-provider";
import { IElementalInbox } from "./types";
import { createCourierClient, Inbox } from "@trycourier/client-graphql";
import { IGetInboxMessagesParams } from "@trycourier/client-graphql";
import { initInbox } from "./actions/init";
import { toggleInbox } from "./actions/toggle-inbox";
import { setView } from "./actions/set-view";
import { markMessageRead } from "./actions/mark-message-read";
import { markAllRead } from "./actions/mark-all-read";
import { markMessageUnread } from "./actions/mark-message-unread";
import { markMessageArchived } from "./actions/mark-message-archived";

export interface IFetchMessagesParams {
  params?: IGetInboxMessagesParams;
  after?: string;
}

interface IInboxActions {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetInboxMessagesParams) => void;
  init: (inbox: IElementalInbox) => void;
  markAllAsRead: () => void;
  markMessageArchived: (messageId: string) => Promise<void>;
  markMessageRead: (messageId: string) => Promise<void>;
  markMessageUnread: (messageId: string) => Promise<void>;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
}

const useElementalInboxActions = (): IInboxActions => {
  const { apiUrl, clientKey, dispatch, inbox, userId, userSignature } =
    useCourier<{
      inbox: IElementalInbox;
    }>();

  const courierClient = createCourierClient({
    apiUrl,
    clientKey,
    userId,
    userSignature,
  });

  const messages = Inbox({ client: courierClient });

  return {
    init: (payload) => {
      dispatch(initInbox(payload));

      if (payload.isOpen) {
        dispatch({
          type: "inbox/FETCH_MESSAGES",
          payload: () => messages.getMessages(),
        });
      }
    },
    toggleInbox: (isOpen?: boolean) => {
      dispatch(toggleInbox(isOpen));
    },
    setView: (view: "messages" | "preferences") => {
      dispatch(setView(view));
    },
    fetchMessages: (payload?: IFetchMessagesParams) => {
      const params = {
        from: inbox?.from,
        ...payload?.params,
      };
      dispatch({
        type: "inbox/FETCH_MESSAGES",
        payload: () => messages.getMessages(params, payload?.after),
        meta: payload,
      });
    },
    getUnreadMessageCount: () => {
      dispatch({
        type: "inbox/FETCH_UNREAD_MESSAGE_COUNT",
        payload: () =>
          messages.getInboxCount({
            tags: [],
            status: "unread",
          }),
      });
    },
    markMessageRead: async (messageId: string) => {
      dispatch(markMessageRead(messageId));
      await messages.markRead(messageId);
    },
    markAllAsRead: async () => {
      dispatch(markAllRead());
      await messages.markAllRead();
    },
    markMessageUnread: async (messageId: string) => {
      dispatch(markMessageUnread(messageId));
      await messages.markUnread(messageId);
    },
    markMessageArchived: async (messageId: string) => {
      dispatch(markMessageArchived(messageId));
      await messages.markArchive(messageId);
    },
  };
};

export default useElementalInboxActions;
