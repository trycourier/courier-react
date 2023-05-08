import { IInbox } from "./types";

import { InboxInit, INBOX_INIT } from "./actions/init";
import { InboxSetView, INBOX_SET_VIEW } from "./actions/set-view";
import { ToggleInbox, INBOX_TOGGLE } from "./actions/toggle-inbox";
import { MarkAllRead, INBOX_MARK_ALL_READ } from "./actions/mark-all-read";
import { NewMessage, INBOX_NEW_MESSAGE } from "./actions/new-message";

import {
  ResetLastFetched,
  INBOX_RESET_LAST_FETCHED,
} from "./actions/reset-last-fetched";
import {
  MarkMessageArchived,
  INBOX_MARK_MESSAGE_ARCHIVED,
} from "./actions/mark-message-archived";
import {
  MarkMessageRead,
  INBOX_MARK_MESSAGE_READ,
} from "./actions/mark-message-read";
import {
  MarkMessageOpened,
  INBOX_MARK_MESSAGE_OPENED,
} from "./actions/mark-message-opened";
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
  | MarkMessageOpened
  | MarkMessageRead
  | MarkMessageUnread
  | NewMessage
  | ResetLastFetched
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

    case INBOX_FETCH_UNREAD_MESSAGE_COUNT_DONE: {
      return {
        ...state,
        unreadMessageCount: action.payload?.count ?? 0,
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

    case INBOX_RESET_LAST_FETCHED: {
      return {
        ...state,
        lastMessagesFetched: undefined,
      };
    }

    case INBOX_FETCH_MESSAGES_DONE: {
      const newMessages = action.payload.appendMessages
        ? [...(state?.messages ?? []), ...action.payload.messages]
        : action.payload.messages;

      return {
        ...state,
        isLoading: false,
        lastMessagesFetched: new Date().getTime(),
        messages: newMessages,
        pinned: action.payload.appendMessages
          ? state.pinned
          : action.payload.pinned,
        startCursor: action.payload.startCursor,
      };
    }

    case INBOX_MARK_MESSAGE_READ: {
      const unreadMessageCount = Math.max(
        0,
        (state.unreadMessageCount ?? 0) - 1
      );

      const handleMarkRead = (message) => {
        if (message.messageId === action.payload.messageId) {
          return {
            ...message,
            read: new Date().toISOString(),
          };
        }

        return message;
      };

      return {
        ...state,
        pinned: state.pinned?.map(handleMarkRead),
        messages: state.messages?.map(handleMarkRead),
        unreadMessageCount,
      };
    }

    case INBOX_MARK_MESSAGE_UNREAD: {
      const unreadMessageCount = (state.unreadMessageCount ?? 0) + 1;

      const handleMarkUnread = (message) => {
        if (message.messageId !== action.payload.messageId) {
          return message;
        }

        const newMessage = {
          ...message,
          read: undefined,
        };

        return newMessage;
      };

      return {
        ...state,
        messages: state.messages?.map(handleMarkUnread),
        pinned: state.pinned?.map(handleMarkUnread),
        unreadMessageCount,
      };
    }

    case INBOX_MARK_MESSAGE_OPENED: {
      const handleMarkOpened = (message) => {
        if (message.messageId === action.payload.messageId) {
          return {
            ...message,
            opened: new Date().toISOString(),
          };
        }

        return message;
      };

      return {
        ...state,
        messages: state.messages?.map(handleMarkOpened),
        pinned: state.pinned?.map(handleMarkOpened),
      };
    }

    case INBOX_MARK_MESSAGE_ARCHIVED: {
      let unreadMessageCount = state.unreadMessageCount ?? 0;

      const handleArchived = (message) => {
        const isMatching = message.messageId === action.payload.messageId;
        if (isMatching && !message.read) {
          unreadMessageCount = Math.max(unreadMessageCount - 1, 0);
        }

        return !isMatching;
      };

      return {
        ...state,
        pinned: state.pinned?.filter(handleArchived),
        messages: state.messages?.filter(handleArchived),
        unreadMessageCount,
      };
    }

    case INBOX_NEW_MESSAGE: {
      const newMessage = {
        ...action.payload,
        created: new Date().toISOString(),
      };

      if (newMessage.pinned) {
        return {
          ...state,
          unreadMessageCount: (state.unreadMessageCount ?? 0) + 1,
          pinned: [newMessage, ...(state.pinned ?? [])],
        };
      }

      return {
        ...state,
        unreadMessageCount: (state.unreadMessageCount ?? 0) + 1,
        messages: [newMessage, ...(state.messages ?? [])],
      };
    }

    case INBOX_MARK_ALL_READ: {
      const unreadMessageCount = 0;

      const newMessages = state.messages?.map((message) => {
        return {
          ...message,
          read: new Date().toISOString(),
        };
      });

      return {
        ...state,
        lastMarkedAllRead: new Date().getTime(),
        messages: newMessages,
        unreadMessageCount,
      };
    }
  }

  return state;
};
