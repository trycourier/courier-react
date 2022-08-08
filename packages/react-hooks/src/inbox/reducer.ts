import { IGraphMessageResponse } from "@trycourier/client-graphql";
import { IMessage, IInbox, ITab } from "./types";

import { InboxInit, INBOX_INIT } from "./actions/init";
import { InboxSetView, INBOX_SET_VIEW } from "./actions/set-view";
import { ToggleInbox, INBOX_TOGGLE } from "./actions/toggle-inbox";
import { MarkAllRead, INBOX_MARK_ALL_READ } from "./actions/mark-all-read";
import { NewMessage, INBOX_NEW_MESSAGE } from "./actions/new-message";
import {
  MarkMessageArchived,
  INBOX_MARK_MESSAGE_ARCHIVED,
} from "./actions/mark-message-archived";
import {
  MarkMessageRead,
  INBOX_MARK_MESSAGE_READ,
} from "./actions/mark-message-read";
import {
  MarkMessageUnread,
  INBOX_MARK_MESSAGE_UNREAD,
} from "./actions/mark-message-unread";
import {
  FetchUnreadMessageCountDone,
  INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE,
} from "./actions/fetch-unread-message-count";
import {
  FetchMessagesDone,
  FetchMessagesError,
  FetchMessagesPending,
  INBOX_FETCH_MESSAGES_DONE,
  INBOX_FETCH_MESSAGES_ERROR,
  INBOX_FETCH_MESSAGES_PENDING,
} from "./actions/fetch-messages";
import {
  SetCurrentTab,
  INBOX_SET_CURRENT_TAB,
} from "./actions/set-current-tab";

export const mapMessage = (message: IGraphMessageResponse): IMessage => ({
  blocks: message.content.blocks,
  body: message.content.body,
  created: message.created,
  data: message.content.data,
  messageId: message.messageId,
  read: message.read,
  title: message.content.title,
  trackingIds: message.content.trackingIds,
});

export const initialState: IInbox = {
  isOpen: false,
  messages: [],
  view: "messages",
  unreadMessageCount: 0,
};

type InboxAction =
  | FetchMessagesDone
  | FetchMessagesError
  | FetchMessagesPending
  | FetchUnreadMessageCountDone
  | InboxInit
  | InboxSetView
  | MarkAllRead
  | MarkMessageArchived
  | MarkMessageRead
  | MarkMessageUnread
  | NewMessage
  | SetCurrentTab
  | ToggleInbox;

export default (state: IInbox = initialState, action?: InboxAction): IInbox => {
  switch (action?.type) {
    case INBOX_INIT: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case INBOX_SET_VIEW: {
      return {
        ...state,
        view: action.payload,
      };
    }

    case INBOX_TOGGLE: {
      return {
        ...state,
        isOpen:
          typeof action.payload === "boolean" ? action.payload : !state.isOpen,
      };
    }

    case INBOX_SET_CURRENT_TAB: {
      const newTab: ITab = action.payload;

      if (newTab.state) {
        return {
          ...state,
          ...newTab.state,
          currentTab: action.payload,
        };
      }

      return {
        ...state,
        currentTab: action.payload,
      };
    }

    case INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE: {
      return {
        ...state,
        unreadMessageCount: action.payload,
      };
    }

    case INBOX_FETCH_MESSAGES_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case INBOX_FETCH_MESSAGES_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case INBOX_FETCH_MESSAGES_DONE: {
      const mappedMessages = action.payload.messages.map(mapMessage);

      const newMessages = action.payload.appendMessages
        ? [...(state.messages ?? []), ...mappedMessages]
        : mappedMessages;

      const currentTab = state.currentTab;
      if (currentTab) {
        currentTab.state = {
          messages: newMessages,
          startCursor: action.payload.startCursor,
        };
      }

      return {
        ...state,
        currentTab,
        isLoading: false,
        messages: newMessages,
        startCursor: action.payload.startCursor,
      };
    }

    case INBOX_MARK_MESSAGE_READ: {
      const unreadMessageCount = Math.max(
        (state.unreadMessageCount ?? 0) - 1,
        0
      );

      const currentTab = state.currentTab;
      if (currentTab?.filters?.isRead === false) {
        const newMessages = state.messages?.filter(
          (message) => message.messageId !== action.payload.messageId
        );

        currentTab.state = currentTab.state ?? {};
        currentTab.state.messages = newMessages;

        const tabs = state.tabs?.map((tab) => {
          if (!tab.state) {
            return tab;
          }

          if (tab.filters.isRead === false) {
            tab.state.messages = newMessages;
            return tab;
          }

          tab.state.messages = tab.state.messages?.map((message) => {
            if (message.messageId === action.payload.messageId) {
              return {
                ...message,
                read: new Date().getTime(),
              };
            }

            return message;
          });

          return tab;
        });

        return {
          ...state,
          currentTab,
          messages: newMessages,
          tabs,
          unreadMessageCount,
        };
      }

      // not on unread tab
      const newMessages = state.messages?.map((message) => {
        if (message.messageId === action.payload.messageId) {
          return {
            ...message,
            read: new Date().getTime(),
          };
        }

        return message;
      });

      if (currentTab) {
        currentTab.state = currentTab.state ?? {};
        currentTab.state.messages = newMessages;
      }

      const tabs = state.tabs?.map((tab) => {
        if (!tab.state) {
          return tab;
        }

        if (tab.filters.isRead === false) {
          tab.state.messages = tab.state.messages?.filter(
            (message) => message.messageId !== action.payload.messageId
          );
          return tab;
        }

        tab.state.messages = tab.state.messages?.map((message) => {
          if (message.messageId === action.payload.messageId) {
            return {
              ...message,
              read: new Date().getTime(),
            };
          }

          return message;
        });

        return tab;
      });

      return {
        ...state,
        currentTab,
        messages: newMessages,
        tabs,
        unreadMessageCount,
      };
    }

    case INBOX_MARK_MESSAGE_UNREAD: {
      const unreadMessageCount = (state.unreadMessageCount ?? 0) + 1;

      let messageToUnread: IMessage;
      const currentTab = state.currentTab;
      const newMessages = state.messages?.map((message) => {
        if (message.messageId !== action.payload.messageId) {
          return message;
        }

        const newMessage = {
          ...message,
          read: undefined,
        };

        messageToUnread = newMessage;
        return newMessage;
      });

      if (currentTab) {
        currentTab.state = currentTab.state ?? {};
        currentTab.state.messages = newMessages;
      }

      const tabs = state.tabs?.map((tab) => {
        if (!tab.state) {
          return tab;
        }

        if (tab.filters.isRead === false) {
          tab.state.messages = [messageToUnread, ...(tab.state.messages ?? [])];
          return tab;
        }

        tab.state.messages = newMessages;

        return tab;
      });

      return {
        ...state,
        currentTab,
        messages: newMessages,
        tabs,
        unreadMessageCount,
      };
    }

    case INBOX_MARK_MESSAGE_ARCHIVED: {
      let unreadMessageCount = state.unreadMessageCount ?? 0;

      const newMessages = state.messages?.filter((message) => {
        const isMatching = message.messageId === action.payload.messageId;
        if (isMatching && !message.read) {
          unreadMessageCount = Math.max(unreadMessageCount - 1, 0);
        }

        return !isMatching;
      });

      return {
        ...state,
        messages: newMessages,
        unreadMessageCount,
      };
    }

    case INBOX_NEW_MESSAGE: {
      return {
        ...state,
        unreadMessageCount: (state.unreadMessageCount ?? 0) + 1,
        messages: [
          {
            created: new Date().getTime(),
            messageId: action.payload.messageId ?? new Date().toISOString(),
            title: action.payload.title,
            body: action.payload.body,
            blocks: action.payload.blocks,
            data: action.payload.data,
            trackingIds: action.payload?.trackingIds,
          },
          ...(state.messages || []),
        ],
      };
    }

    case INBOX_MARK_ALL_READ: {
      const unreadMessageCount = 0;

      if (state.currentTab?.filters?.isRead === false) {
        return {
          ...state,
          messages: [],
          unreadMessageCount,
        };
      }

      return {
        ...state,
        messages: state.messages?.map((message) => {
          return {
            ...message,
            read: new Date().getTime(),
          };
        }),
        unreadMessageCount,
      };
    }
  }

  return state;
};
