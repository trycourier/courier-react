import React, { useReducer } from "react";
import * as types from "./types";

export * from "./transports";
export * from "./hooks";

import * as TransportTypes from "./transports/types";

export type ICourierMessage = TransportTypes.ICourierMessage;

export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

enum ActionType {
  INIT_TOAST = "INIT_TOAST",
  INIT_INBOX = "INIT_INBOX",
}
interface IAction {
  type: ActionType;
  payload: any;
}

const reducer = (state, action) => {
  switch (action.type) {
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
  }
  return state;
};

export const CourierProvider: React.FunctionComponent<ICourierContext> = ({
  apiUrl,
  children,
  clientKey,
  transport,
  userId,
  userSignature,
}) => {
  const [context, dispatch] = useReducer<
    React.Reducer<ICourierContext, IAction>
  >(reducer, {
    apiUrl,
    clientKey,
    transport,
    userId,
    userSignature,
  });

  return (
    <CourierContext.Provider
      value={{
        ...context,
        dispatch,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};
