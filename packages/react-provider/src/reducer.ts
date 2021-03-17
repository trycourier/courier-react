
export interface IAction {
  type: "root/INIT" | "root/REGISTER_REDUCER";
  payload: any;
}

export default (state, action) => {
  const [scope] = action.type.split("/");

  if (scope !== "root" && state.reducers[scope]) {
    return {
      ...state,
      [scope]: state.reducers[scope](state?.[scope] ?? {}, action)
    }
  }
  


  switch (action.type) {
    case "root/INIT": {
      return {
        ...state,
        apiUrl: action.payload.apiUrl,
        clientKey: action.payload.clientKey,
        transport: action.payload.transport,
        userId: action.payload.userId,
        userSignature: action.payload.userSignature,
      };
    }

    case "root/REGISTER_REDUCER": {
      return {
        ...state,
        reducers: {
          ...state.reducers,
          [action.payload.scope]: action.payload.reducer
        }
      };
    }

    case "INIT_TOAST": {
      return {
        ...state,
        toastConfig: action.payload.config,
        toast: action.payload.toast,
      };
    }

    case "INIT_INBOX": {
      return {
        ...state,
        inboxConfig: action.payload.config,
      };
    }

    case "GET_MESSAGES": {
      return {
        ...state,
        inboxConfig: action.payload.messages,
      };
    }
  }
  return state;
};
