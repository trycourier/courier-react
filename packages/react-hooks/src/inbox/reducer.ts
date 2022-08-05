import { IMessage, IInbox, ITab } from "./types";

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

const initialState: IInbox = {
  isOpen: false,
  messages: [],
  view: "messages",
  unreadMessageCount: 0,
};

export default (state: IInbox = initialState, action): IInbox => {
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
      const newTab: ITab = action.payload;

      return {
        ...state,
        ...newTab?.state,
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
      const mappedMessages = action?.payload?.messages?.map(makeMessage);

      const newMessages = action?.payload?.appendMessages
        ? [...(state?.messages ?? []), ...mappedMessages]
        : mappedMessages;

      const currentTab = state.currentTab;
      if (currentTab) {
        currentTab.state = {
          messages: newMessages,
          startCursor: action?.payload?.startCursor,
        };
      }

      return {
        ...state,
        currentTab,
        isLoading: false,
        messages: newMessages,
        startCursor: action?.payload?.startCursor,
      };
    }

    case "inbox/MARK_MESSAGE_UNREAD": {
      const unreadMessageCount = (state.unreadMessageCount ?? 0) + 1;

      let messageToUnread: IMessage;
      const newMessages = state?.messages?.map((message) => {
        if (message.messageId === action.payload.messageId) {
          const newMessage = {
            ...message,
            read: false,
          };

          messageToUnread = newMessage;
          return newMessage;
        }

        return message;
      });

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
        messages: newMessages,
        tabs,
        unreadMessageCount,
      };
    }

    case "inbox/MARK_MESSAGE_READ": {
      const unreadMessageCount = Math.max(
        (state.unreadMessageCount ?? 0) - 1,
        0
      );

      if (state.currentTab?.filters?.isRead === false) {
        const newMessages = state?.messages?.filter(
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
          tabs,
          messages: newMessages,
          unreadMessageCount,
        };
      }

      // not on unread tab
      const newMessages = state?.messages?.map((message) => {
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
        tabs,
        messages: newMessages,
        unreadMessageCount,
      };
    }

    case "inbox/MARK_MESSAGE_ARCHIVED": {
      let unreadMessageCount = state.unreadMessageCount ?? 0;

      const newMessages = state?.messages?.filter((message) => {
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

    case "inbox/FETCH_MESSAGES/ERROR": {
      return {
        ...state,
        isLoading: false,
      };
    }

    case "inbox/NEW_MESSAGE": {
      return {
        ...state,
        unreadMessageCount: (state?.unreadMessageCount ?? 0) + 1,
        messages: [
          {
            created: new Date().toISOString(),
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
        messages: state?.messages?.map((message) => {
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
