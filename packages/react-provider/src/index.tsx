import React, { useReducer } from "react";
import * as types from "./types";

export { default as useCourier } from "./use-courier";
import * as TransportTypes from "./transports/types";

export type ICourierMessage = TransportTypes.ICourierMessage;

export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

function reducer(state, action) {
  switch (action.type) {
    case "INIT_TOAST":
      return {
        ...state,
        toastConfig: action.payload.config,
        toast: action.payload.toast,
      };
  }
}

export const CourierProvider: React.FunctionComponent<ICourierContext> = ({
  children,
  clientKey,
  transport,
  userSignature,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    clientKey,
    transport,
    userSignature,
  });

  return (
    <CourierContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};
