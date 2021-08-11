import { Transport } from "./transports";
import { Interceptor } from "./transports/types";

export interface Brand {
  inapp?: {
    disableCourierFooter?: boolean;
    borderRadius?: string;
    disableMessageIcon?: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    widgetBackground?: {
      topColor?: string;
      bottomColor?: string;
    };
    icons?: {
      bell?: string;
      message?: string;
    };
    toast?: {
      borderRadius?: string;
      timerAutoClose?: number;
    };
  };
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

export interface ICourierProviderProps {
  apiUrl?: string;
  brand?: Brand;
  brandId?: string;
  clientKey?: string;
  transport?: Transport;
  userId?: string;
  userSignature?: string;
  wsUrl?: string;
  middleware?: any;
  onMessage?: Interceptor;
}
export interface ICourierContext extends ICourierProviderProps {
  dispatch?: (action: { type: string; payload: any }) => void;
  graphQLClient?: any;
}
