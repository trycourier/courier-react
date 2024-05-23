import { IInboxMessagePreview } from "@trycourier/core";
import { IInbox } from "./types";

import { InboxInit, INBOX_INIT } from "./actions/init";
import { InboxSetView, INBOX_SET_VIEW } from "./actions/set-view";
import { ToggleInbox, INBOX_TOGGLE } from "./actions/toggle-inbox";
import { MarkAllRead, INBOX_MARK_ALL_READ } from "./actions/mark-all-read";
import { NewMessage, INBOX_NEW_MESSAGE } from "./actions/new-message";
import { UnpinMessage, INBOX_UNPIN_MESSAGE } from "./actions/unpin-message";

import {
  ResetLastFetched,
  INBOX_RESET_LAST_FETCHED,
} from "./actions/reset-last-fetched";
import { AddTag, INBOX_ADD_TAG } from "./actions/add-tag";
import { RemoveTag, INBOX_REMOVE_TAG } from "./actions/remove-tag";

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
  | AddTag
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
  | RemoveTag
  | ResetLastFetched
  | ToggleInbox
  | UnpinMessage;

const sortPinned = (
  pinned: IInbox["pinned"],
  brand: IInbox["brand"]
): IInboxMessagePreview[] => {
  const configuredSlots = brand?.inapp?.slots?.map((s) => s.id);

  const pinnedBySlot = pinned?.reduce(
    (acc, curr) => {
      if (!curr.pinned || !curr.pinned?.slotId) {
        return acc;
      }

      if (configuredSlots?.includes(curr?.pinned?.slotId)) {
        acc[curr?.pinned?.slotId] = acc[curr?.pinned?.slotId] || [];
        acc[curr?.pinned?.slotId].push(curr);
      } else {
        acc.unconfigured.push(curr);
      }

      return acc;
    },
    {
      unconfigured: [],
    } as {
      unconfigured: IInboxMessagePreview[];
      [key: string]: IInboxMessagePreview[];
    }
  );

  const mappedPinnedMessages = (configuredSlots ?? [])
    .map((slotId) => pinnedBySlot?.[slotId] ?? [])
    .filter(Boolean)
    .flat();

  return [...mappedPinnedMessages, ...(pinnedBySlot?.unconfigured ?? [])];
};

const sortMessages = (a, b) => {
  return new Date(b.created).getTime() - new Date(a.created).getTime();
};

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
      const newMessages = action.payload?.appendMessages
        ? [...(state?.messages ?? []), ...(action.payload?.messages ?? [])]
        : action.payload?.messages;

      return {
        ...state,
        isLoading: false,
        lastMessagesFetched: new Date().getTime(),
        messages: newMessages as IInboxMessagePreview[],
        pinned: action.payload?.appendMessages
          ? state.pinned
          : sortPinned(action.payload?.pinned, state.brand),
        startCursor: action.payload?.startCursor,
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

      const newPinned = state.pinned?.map(handleMarkRead);
      const newMessages = state.messages?.map(handleMarkRead);

      return {
        ...state,
        pinned: newPinned,
        messages: newMessages,
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

      const newPinned = state.pinned?.map(handleMarkUnread);
      const newMessages = state.messages?.map(handleMarkUnread);

      return {
        ...state,
        messages: newMessages,
        pinned: newPinned,
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

      const newPinned = state.pinned?.map(handleMarkOpened);
      const newMessages = state.messages?.map(handleMarkOpened);

      return {
        ...state,
        messages: newMessages,
        pinned: newPinned,
      };
    }

    case INBOX_ADD_TAG: {
      const handleAddTag = (message: IInboxMessagePreview) => {
        if (message.messageId === action.payload.messageId) {
          const tags = message.tags ?? [];
          if (!tags.includes(action.payload.tag)) {
            tags.push(action.payload.tag);
          }
          return {
            ...message,
            tags,
          };
        }

        return message;
      };

      const newPinned = state.pinned?.map(handleAddTag);
      const newMessages = state.messages?.map(handleAddTag);

      return {
        ...state,
        pinned: newPinned,
        messages: newMessages,
      };
    }

    case INBOX_REMOVE_TAG: {
      const handleRemoveTag = (message: IInboxMessagePreview) => {
        if (message.messageId === action.payload.messageId) {
          const tags = message?.tags?.filter((t) => t !== action.payload.tag);
          return {
            ...message,
            tags,
          };
        }

        return message;
      };

      const newPinned = state.pinned?.map(handleRemoveTag);
      const newMessages = state.messages?.map(handleRemoveTag);

      return {
        ...state,
        pinned: newPinned,
        messages: newMessages,
      };
    }

    case INBOX_UNPIN_MESSAGE: {
      const pinned = state.pinned ?? [];
      const messageToUnpin = pinned?.find((p) => {
        return p.messageId === action.payload.messageId;
      });

      if (!messageToUnpin) {
        return state;
      }

      return {
        ...state,
        pinned: pinned.filter((p) => {
          return p.messageId !== action.payload.messageId;
        }),
        messages: [
          ...(state.messages ?? []),
          {
            ...messageToUnpin,
            pinned: undefined,
          },
        ].sort(sortMessages),
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

      const newPinned = state.pinned?.filter(handleArchived);
      const newMessages = state.messages?.filter(handleArchived);

      return {
        ...state,
        pinned: newPinned,
        messages: newMessages,
        unreadMessageCount,
      };
    }

    case INBOX_NEW_MESSAGE: {
      const newMessage = {
        ...action.payload,
        created: new Date().toISOString(),
      };

      if (newMessage?.pinned?.slotId) {
        const newPinned = sortPinned(
          [newMessage, ...(state.pinned ?? [])],
          state.brand
        );

        return {
          ...state,
          unreadMessageCount: (state.unreadMessageCount ?? 0) + 1,
          pinned: newPinned,
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

      const handleMarkRead = (message) => {
        return {
          ...message,
          read: new Date().toISOString(),
        };
      };

      const newPinned = state.pinned?.map(handleMarkRead);
      const newMessages = state.messages?.map(handleMarkRead);

      return {
        ...state,
        lastMarkedAllRead: new Date().getTime(),
        messages: newMessages,
        pinned: newPinned,
        unreadMessageCount,
      };
    }
  }

  return state;
};
