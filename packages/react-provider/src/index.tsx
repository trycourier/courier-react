import React, { useState } from "react";
import * as types from "./types";

export { default as useCourier } from "./use-courier";
import * as TransportTypes from "./transports/types";

export type ICourierMessage = TransportTypes.ICourierMessage;

export type ICourierContext = types.ICourierContext;
export const CourierContext = React.createContext<ICourierContext | undefined>(
  undefined
);

export const CourierProvider: React.FunctionComponent<ICourierContext> = ({
  children,
  clientKey,
  transport,
  userSignature,
}) => {
  const [context, setContext] = useState<ICourierContext>({
    clientKey,
    transport,
    userSignature,
  });

  return (
    <CourierContext.Provider
      value={{
        ...context,
        setContext,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};
