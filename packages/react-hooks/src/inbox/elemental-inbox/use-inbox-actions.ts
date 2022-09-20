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
    apiUrl:
      apiUrl ??
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
    clientKey,
    userId,
    userSignature,
  });

  const inboxClient = Inbox({ client: courierClient });

  return {
    init: (payload) => {
      dispatch(initInbox(payload));

      if (payload.isOpen) {
        dispatch({
          type: "inbox/FETCH_MESSAGES",
          payload: () => inboxClient.getMessages(),
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
        payload: () => inboxClient.getMessages(params, payload?.after),
        meta: payload,
      });
    },
    getUnreadMessageCount: () => {
      dispatch({
        type: "inbox/FETCH_UNREAD_MESSAGE_COUNT",
        payload: () =>
          inboxClient.getInboxCount({
            status: "unread",
          }),
      });
    },
    markMessageRead: async (messageId: string) => {
      dispatch(markMessageRead(messageId));
      await inboxClient.markRead(messageId);
    },
    markAllAsRead: async () => {
      dispatch(markAllRead());
      await inboxClient.markAllRead();
    },
    markMessageUnread: async (messageId: string) => {
      dispatch(markMessageUnread(messageId));
      await inboxClient.markUnread(messageId);
    },
    markMessageArchived: async (messageId: string) => {
      dispatch(markMessageArchived(messageId));
      await inboxClient.markArchive(messageId);
    },
  };
};

export default useElementalInboxActions;
