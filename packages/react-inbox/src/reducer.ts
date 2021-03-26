
export default (state, action) => {
  switch (action.type) {
    case "inbox/INIT": {
      return {
        ...state,
        config: action.payload.config,
      };
    }

    case "inbox/SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }

    case "inbox/SET_HAS_UNREAD_MESSAGES": {
      return {
        ...state,
        hasUnreadMessages: action.payload.hasUnreadMessages,
      };
    }

    case "inbox/SET_MESSAGES": {
      return {
        ...state,
        messages: action?.payload?.map(message => ({
          messageId: message.messageId,
          created: message.created,
          title: message?.content?.title,
          body: message?.content?.body,
          data: message?.content?.data,
        })),
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
        ]
      };
    }
  }

  return state;
};
