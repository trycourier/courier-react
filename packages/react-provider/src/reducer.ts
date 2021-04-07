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
    const newState = reducers[scope](state?.[scope], action);

    return {
      ...state,
      [scope]: newState,
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

    default: {
      return state;
    }
  }
};

export default rootReducer;
