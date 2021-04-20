import { Transport } from "./transports";

interface Brand {
  inapp: {
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
export interface ICourierContext {
  apiUrl?: string;
  clientKey?: string;
  dispatch?: (mergeContext: any) => void;
  transport?: Transport;
  userId?: string;
  userSignature?: string;
  wsUrl?: string;
  brandId?: string;
  brand?: Brand;
}
