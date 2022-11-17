import { CourierTransport, useCourier } from "@trycourier/react-provider";
import { IElementalInbox } from "./types";
import { createCourierClient, Inbox } from "@trycourier/client-graphql";
import { IGetInboxMessagesParams } from "@trycourier/client-graphql";
import { initInbox } from "../actions/init";
import { toggleInbox } from "../actions/toggle-inbox";
import { setView } from "../actions/set-view";
import { markMessageRead } from "../actions/mark-message-read";
import { markAllRead } from "./actions/mark-all-read";
import { markMessageUnread } from "../actions/mark-message-unread";
import { markMessageArchived } from "../actions/mark-message-archived";
import { IInbox } from "../types";

export interface IFetchMessagesParams {
  params?: IGetInboxMessagesParams;
  after?: string;
}

interface IInboxActions {
  /** Fetches messages from the server, sets inbox.messages to the received value */
  fetchMessages: (params?: IFetchMessagesParams) => void;
  /** Returns a count of messages that do not have a message.read date */
  getUnreadMessageCount: (params?: IGetInboxMessagesParams) => void;
  init: (inbox: IInbox<IElementalInbox>) => void;
  /** Marks all messages as read by setting message.read to the current ISO 8601 date */
  markAllAsRead: () => void;
  /** Archives the supplied message, archived messages are not returned by fetchMessages */
  markMessageArchived: (messageId: string) => Promise<void>;
  /** Sets message.read to the current ISO 8601 date  */
  markMessageRead: (messageId: string) => Promise<void>;
  /** Removes message.read, signalling that the message is no longer read */
  markMessageUnread: (messageId: string) => Promise<void>;
  setView: (view: "messages" | "preferences") => void;
  toggleInbox: (isOpen?: boolean) => void;
  /**
   * Allows for renewal of sessions authorized with short lived tokens.
   * For example, if the supplied authorization token lasts 10 minutes,
   * this function can be called with a new token every 5 minutes to ensure
   * messages are received in real time with no interruptions.
   */
  renewSession: (authorization: string) => void;
}

const useElementalInboxActions = (): IInboxActions => {
  const {
    apiUrl,
    authorization,
    clientSourceId,
    clientKey,
    dispatch,
    inbox,
    transport,
    userId,
    userSignature,
  } =
    useCourier<{
      inbox: IElementalInbox;
    }>();

  const courierClient = createCourierClient({
    authorization,
    apiUrl:
      apiUrl ??
      "https://fxw3r7gdm9.execute-api.us-east-1.amazonaws.com/production/q",
    clientKey,
    clientSourceId,
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
    renewSession: async (token: string) => {
      if (transport instanceof CourierTransport) {
        transport.renewSession(token);
      }
    },
  };
};

export default useElementalInboxActions;
