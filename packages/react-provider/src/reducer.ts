import { ICourierContext } from "./types";

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

const rootReducer = (state: Partial<ICourierContext>, action) => {
  if (
    typeof window !== "undefined" &&
    (
      window as {
        DEBUG_COURIER_PROVIDER?: boolean;
      }
    ).DEBUG_COURIER_PROVIDER
  ) {
    console.log(action);
  }

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
        ...action.payload,
      };
    }
    case "root/GET_BRAND/DONE": {
      return {
        ...state,
        brand: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
