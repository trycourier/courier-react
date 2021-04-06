export interface IAction {
  type: "root/INIT";
  payload: any;
}
const reducers = {};

export const registerReducer = (scope, reducer) => {
  if (scope === "root") {
    return;
  }

  reducers[scope] = reducer;
};

const rootReducer = (state, action) => {
  const [scope] = action.type.split("/");

  if (scope !== "root" && reducers[scope]) {
    return {
      ...state,
      [scope]: reducers[scope](state?.[scope] ?? {}, action),
    };
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

    case "INIT_TOAST": {
      return {
        ...state,
        toastConfig: action.payload.config,
        toast: action.payload.toast,
      };
    }
  }
  return state;
};

export default rootReducer;
