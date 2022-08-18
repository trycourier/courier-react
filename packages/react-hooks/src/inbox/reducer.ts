import { IGraphMessageResponse } from "@trycourier/client-graphql";
import { IMessage, IInbox, ITab } from "./types";

import { InboxInit, INBOX_INIT } from "./actions/init";
import { InboxSetView, INBOX_SET_VIEW } from "./actions/set-view";
import { ToggleInbox, INBOX_TOGGLE } from "./actions/toggle-inbox";
import { MarkAllRead, INBOX_MARK_ALL_READ } from "./actions/mark-all-read";
import { NewMessage, INBOX_NEW_MESSAGE } from "./actions/new-message";
import {
  Rehydratemessages,
  INBOX_REHYDRATE_MESSAGES,
} from "./actions/rehydrate-messages";

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
  FetchMessageListsDone,
  FetchMessageListsError,
  FetchMessageListsPending,
  INBOX_FETCH_MESSAGE_LISTS_DONE,
  INBOX_FETCH_MESSAGE_LISTS_ERROR,
  INBOX_FETCH_MESSAGE_LISTS_PENDING,
} from "./actions/fetch-message-lists";
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
  | FetchMessageListsDone
  | FetchMessageListsError
  | FetchMessageListsPending
  | FetchMessagesDone
  | FetchMessagesError
  | FetchMessagesPending
  | FetchUnreadMessageCountDone
  | InboxInit
  | InboxSetView
  | MarkAllRead
  | Rehydratemessages
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

    case INBOX_FETCH_MESSAGE_LISTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case INBOX_FETCH_MESSAGES_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case INBOX_FETCH_MESSAGE_LISTS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case INBOX_FETCH_MESSAGES_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case INBOX_REHYDRATE_MESSAGES: {
      let bailOnRehydrate = false;

      // tabs mismatch
      if (!state.tabs && action.payload.tabs) {
        return state;
      }

      // tabs aren't being used
      if (!state.tabs && action.payload.messages) {
        return {
          ...state,
          messages: action.payload.messages,
          startCursor: action.payload.startCursor,
          unreadMessageCount: action.payload.unreadMessageCount,
        };
      }

      const newTabs = state.tabs?.map((tab) => {
        const matchingTab = action.payload?.tabs?.find((t) => t.id === tab.id);

        // tabs mismatch
        if (!matchingTab) {
          bailOnRehydrate = true;
          return tab;
        }

        return {
          ...tab,
          state: matchingTab.state,
        };
      });

      if (bailOnRehydrate) {
        return state;
      }

      return {
        ...state,
        ...newTabs?.[0]?.state,
        tabs: newTabs,
        unreadMessageCount: action.payload.unreadMessageCount,
      };
    }

    case INBOX_FETCH_MESSAGE_LISTS_DONE: {
      const newTabs = state.tabs?.map((tab) => {
        const listState = action.payload?.[tab.id];
        return {
          ...tab,
          state: {
            ...listState,
            messages: listState?.messages?.map(mapMessage),
          },
        };
      });

      const currentTab = newTabs?.find(
        (tab) => tab.id === state.currentTab?.id
      );

      return {
        ...state,
        ...currentTab?.state,
        isLoading: false,
        tabs: newTabs,
      };
    }

    case INBOX_FETCH_MESSAGES_DONE: {
      const mappedMessages = action.payload.messages.map(mapMessage);

      const newMessages = action.payload.appendMessages
        ? [...(state.messages ?? []), ...mappedMessages]
        : mappedMessages;

      const tabs = state.tabs?.map((tab) => {
        if (tab.id !== state.currentTab?.id) {
          return tab;
        }

        return {
          ...tab,
          state: {
            startCursor: action.payload.startCursor,
            messages: newMessages,
          },
        };
      });

      return {
        ...state,
        isLoading: false,
        messages: newMessages,
        startCursor: action.payload.startCursor,
        tabs,
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
                read: true,
              };
            }

            return message;
          });

          return tab;
        });

        return {
          ...state,
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
            read: true,
          };
        }

        return message;
      });

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
              read: true,
            };
          }

          return message;
        });

        return tab;
      });

      return {
        ...state,
        messages: newMessages,
        tabs,
        unreadMessageCount,
      };
    }

    case INBOX_MARK_MESSAGE_UNREAD: {
      const unreadMessageCount = (state.unreadMessageCount ?? 0) + 1;

      let messageToUnread: IMessage;
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

      const tabs = state.tabs?.map((tab) => {
        if (!tab.state) {
          return tab;
        }

        if (tab.filters.isRead === false) {
          tab.state.messages = [
            messageToUnread,
            ...(tab.state.messages ?? []),
          ].sort((a, b) => {
            if (a.created < b.created) {
              return 1;
            }

            if (a.created > b.created) {
              return -1;
            }

            return 0;
          });
          return tab;
        }

        tab.state.messages = newMessages;

        return tab;
      });

      return {
        ...state,
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
      const newMessage = {
        ...action.payload,
        created: new Date().toISOString(),
      };

      const newMessages = [newMessage, ...(state.messages ?? [])];
      const currentTab = state.currentTab;

      if (currentTab?.filters?.isRead === false && currentTab?.state) {
        currentTab.state.messages = newMessages;
      }

      const tabs = state.tabs?.map((tab) => {
        if (!tab.state || tab.id === currentTab?.id) {
          return tab;
        }

        tab.state.messages = [newMessage, ...(tab.state.messages ?? [])];
        return tab;
      });

      return {
        ...state,
        currentTab,
        tabs,
        unreadMessageCount: (state.unreadMessageCount ?? 0) + 1,
        messages: newMessages,
      };
    }

    case INBOX_MARK_ALL_READ: {
      const unreadMessageCount = 0;
      const currentTab = state.currentTab;

      if (currentTab?.filters?.isRead === false) {
        const tabs = state.tabs?.map((tab) => {
          if (!tab.state) {
            return tab;
          }

          if (tab.filters.isRead === false) {
            tab.state.messages = [];
            return tab;
          }

          tab.state.messages = tab.state.messages?.map((message) => {
            return {
              ...message,
              read: true,
            };
          });

          return tab;
        });

        return {
          ...state,
          messages: [],
          tabs,
          unreadMessageCount,
        };
      }

      const newMessages = state.messages?.map((message) => {
        return {
          ...message,
          read: true,
        };
      });

      const tabs = state.tabs?.map((tab) => {
        if (!tab.state) {
          return tab;
        }

        if (tab.filters.isRead === false) {
          tab.state.messages = [];
          return tab;
        }

        tab.state.messages = tab.state.messages?.map((message) => {
          return {
            ...message,
            read: true,
          };
        });

        return tab;
      });

      return {
        ...state,
        messages: newMessages,
        tabs,
        unreadMessageCount,
      };
    }
  }

  return state;
};
