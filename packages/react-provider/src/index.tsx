import React, { useReducer, useEffect } from "react";
import * as types from "./types";

export * from "./transports";
export * from "./hooks";

import * as TransportTypes from "./transports/types";
import reducer, { IAction } from "./reducer";

export type ICourierMessage = TransportTypes.ICourierMessage;

export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

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
    reducers: {
      root: reducer,
    },
    userSignature,
    registerReducer: (scope, reducer) => {
      dispatch({
        type: "root/REGISTER_REDUCER",
        payload: {
          scope,
          reducer,
        },
      });
    },
  });

  useEffect(() => {
    dispatch({
      type: "root/INIT",
      payload: {
        apiUrl,
        clientKey,
        transport,
        userId,
        userSignature,
      },
    });
  }, [apiUrl, clientKey, transport, userId, userSignature]);

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
