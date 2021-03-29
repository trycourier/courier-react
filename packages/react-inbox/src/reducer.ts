import { IMessage } from './types';

const makeMessage = (message): IMessage => ({
    body: message?.content?.body,
    created: message.created,
    data: message?.content?.data,
    messageId: message.messageId,
    read: message?.read,
    title: message?.content?.title,
    trackingIds: message?.content?.trackingIds,
});

interface InboxState {
  messages?: Array<IMessage>
  isLoading?: boolean;
  hasUnreadMessages?: boolean;
  currentTab?: {
    id: string;
    label: string;
    filter?: {
      isRead: boolean;
    }
  };
}

export default (state: InboxState = {}, action) => {
  switch (action.type) {
  case "inbox/INIT": {
    return {
      ...state,
      config: action.payload,
      currentTab: action.payload?.tabs?.[0],
    };
  }

  case "inbox/SET_CURRENT_TAB": {
    return {
      ...state,
      messages: state.currentTab !== action.payload ? [] : state.messages,
      currentTab: action.payload,
    };
  }

  case "inbox/SET_UNREAD_MESSAGE_COUNT": {
    return {
      ...state,
      unreadMessageCount: action.payload.unreadMessageCount,
    };
  }

  case "inbox/FETCH_MESSAGES/PENDING": {
    return {
      ...state,
      isLoading: true
    };
  }

  case "inbox/FETCH_MESSAGES/DONE": {
    const newMessages = action?.payload?.messages?.map(makeMessage);

    return {
      ...state,
      isLoading: false,
      startCursor: action?.payload?.startCursor,
      messages: action?.payload?.appendMessages ? [
        ...(state.messages ??[]),
        ...newMessages
      ] : newMessages
    };
  }

  case "inbox/FETCH_MESSAGES/ERROR": {
    return {
      ...state,
      isLoading: false
    };
  }

  case "inbox/ADD_MESSAGES": {
    return {
      ...state,
      startCursor: action?.payload?.startCursor,
      messages: [
        ...(state.messages || []),
        ...action?.payload?.messages?.map(makeMessage),
      ],
    };
  }

  case "inbox/NEW_MESSAGE": {
    return {
      ...state,
      messages: [
        {
          created: new Date().getTime(),
          messageId: action.payload.messageId ?? new Date().getTime(),
          title: action.payload.title,
          body: action.payload.body,
          data: action.payload.data,
        },
        ...state.messages || [],
      ],
    };
  }
  }

  return state;
};
