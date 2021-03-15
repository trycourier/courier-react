import React, { useReducer } from "react";
import * as types from "./types";

export { default as useCourier } from "./use-courier";
export { default as useActions } from "./use-actions";

import { useGraphqlClient } from "./use-graphql-client";
import * as TransportTypes from "./transports/types";
import { ApolloProvider } from "@apollo/client";

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
  children,
  clientKey,
  transport,
  userId,
  userSignature,
}) => {
  const graphqlClient = useGraphqlClient(clientKey, userId, userSignature);
  const [context, dispatch] = useReducer<
    React.Reducer<ICourierContext, IAction>
  >(reducer, {
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
      {graphqlClient ? (
        <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
      ) : (
        children
      )}
    </CourierContext.Provider>
  );
};
