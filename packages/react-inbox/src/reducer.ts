import { IMessage, ITab } from "./types";
import { Brand } from "@trycourier/react-provider";
import { DEFAULT_TABS } from "~/constants";

const makeMessage = (message): IMessage => ({
  blocks: message?.content?.blocks,
  body: message?.content?.body,
  created: message.created,
  data: message?.content?.data,
  messageId: message.messageId,
  read: message?.read,
  title: message?.content?.title,
  trackingIds: message?.content?.trackingIds,
});

export interface InboxState {
  brand?: Brand;
  title?: string;
  labels?: {
    markAsRead?: string;
    markAsUnread?: string;
    markAllAsRead?: string;
    backToInbox?: string;
  };
  currentTab?: ITab;
  defaultIcon?: false | string;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  messages: Array<IMessage>;
  showUnreadMessageCount?: boolean;
  startCursor?: string;
  tabs?: Array<ITab>;
  unreadMessageCount: number;
  view: "messages" | "preferences";
}

const initialState: InboxState = {
  isOpen: false,
  messages: [],
  view: "messages",
  unreadMessageCount: 0,
  tabs: DEFAULT_TABS,
  currentTab: DEFAULT_TABS[0],
};

export default (state: InboxState = initialState, action): InboxState => {
  console.log("action", action);
  switch (action.type) {
    case "inbox/INIT": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "inbox/SET_VIEW": {
      return {
        ...state,
        view: action.payload,
      };
    }

    case "inbox/TOGGLE_INBOX": {
      return {
        ...state,
        isOpen:
          typeof action.payload === "boolean" ? action.payload : !state.isOpen,
      };
    }

    case "inbox/SET_CURRENT_TAB": {
      return {
        ...state,
        messages:
          state.currentTab?.id !== action.payload?.id ? [] : state.messages,
        currentTab: action.payload,
      };
    }

    case "inbox/SET_UNREAD_MESSAGE_COUNT/DONE": {
      return {
        ...state,
        unreadMessageCount: action.payload,
      };
    }

    case "inbox/FETCH_MESSAGES/PENDING": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "inbox/FETCH_MESSAGES/DONE": {
      const newMessages = action?.payload?.messages?.map(makeMessage);

      return {
        ...state,
        isLoading: false,
        startCursor: action?.payload?.startCursor,
        messages: action?.payload?.appendMessages
          ? [...(state?.messages ?? []), ...newMessages]
          : newMessages,
      };
    }

    case "inbox/MARK_MESSAGE_UNREAD": {
      const unreadMessageCount = (state.unreadMessageCount ?? 0) + 1;

      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message.messageId === action.payload.messageId) {
            return {
              ...message,
              read: false,
            };
          }

          return message;
        }),
        unreadMessageCount,
      };
    }

    case "inbox/MARK_MESSAGE_READ": {
      const unreadMessageCount = Math.max(
        (state.unreadMessageCount ?? 0) - 1,
        0
      );

      if (state.currentTab?.filters?.isRead === false) {
        return {
          ...state,
          messages: state.messages.filter(
            (message) => message.messageId !== action.payload.messageId
          ),
          unreadMessageCount,
        };
      }

      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message.messageId === action.payload.messageId) {
            return {
              ...message,
              read: true,
            };
          }

          return message;
        }),
        unreadMessageCount,
      };
    }

    case "inbox/FETCH_MESSAGES/ERROR": {
      return {
        ...state,
        isLoading: false,
      };
    }

    case "inbox/NEW_MESSAGE": {
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount + 1,
        messages: [
          {
            created: new Date().getTime(),
            messageId: action.payload.messageId ?? new Date().getTime(),
            title: action.payload.title,
            body: action.payload.body,
            blocks: action.payload.blocks,
            data: action.payload.data,
            trackingIds: action.payload.data?.trackingIds,
          },
          ...(state.messages || []),
        ],
      };
    }

    case "inbox/MARK_ALL_AS_READ": {
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
        messages: state.messages.map((message) => {
          return {
            ...message,
            read: true,
          };
        }),
        unreadMessageCount,
      };
    }
  }

  return state;
};
