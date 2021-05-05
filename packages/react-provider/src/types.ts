import { Transport } from "./transports";
import { Interceptor } from "./transports/types";

export interface Brand {
  inapp?: {
    borderRadius?: string;
    disableMessageIcon?: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    colors?: {
      invertHeader?: boolean;
      invertButtons?: boolean;
    };
    icons?: {
      bell?: string;
      message?: string;
    };
  };
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}
export interface CourierContext {
  apiUrl?: string;
  brand?: Brand;
  brandId?: string;
  clientKey?: string;
  dispatch?: (mergeContext: any) => void;
  graphQLClient?: any;
  transport?: Transport;
  userId?: string;
  userSignature?: string;
  wsUrl?: string;
  middleware?: any;
  onMessage?: Interceptor;
}
