import { Transport } from "./transports";

export interface Brand {
  borderRadius?: string;
  disableMessageIcon?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  colors?: {
    invertHeader?: boolean;
    invertButtons?: boolean;
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  icons?: {
    bell?: string;
    message?: string;
  };
}
export interface ICourierContext {
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
}
