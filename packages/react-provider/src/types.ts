import { CourierTransport, Transport } from "./transports";
import { Interceptor } from "./transports/types";
import { ErrorEvent } from "reconnecting-websocket";
export { IInboxMessagePreview } from "@trycourier/client-graphql";

export type ErrorEventHandler = (event: ErrorEvent) => void;

export type WSOptions = {
  url?: string;
  onError?: ErrorEventHandler;
  onClose?: () => void;
  onReconnect?: () => void;
  connectionTimeout?: number;
};

export interface PinDetails {
  id: string;
  label: {
    value: string;
    color: string;
  };
  icon: {
    value: string;
    color: string;
  };
}
export interface Brand {
  inapp?: {
    disableCourierFooter?: boolean;
    borderRadius?: string;
    disableMessageIcon?: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    emptyState?: {
      textColor?: string;
      text?: string;
    };
    widgetBackground?: {
      topColor?: string;
      bottomColor?: string;
    };
    icons?: {
      bell?: string;
      message?: string;
    };
    slots?: Array<PinDetails>;
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
  authorization?: string;
  brand?: Brand;
  brandId?: string;
  clientKey?: string;
  id?: string;
  inboxApiUrl?: string;
  localStorage?: Storage;
  middleware?: any;
  onMessage?: Interceptor;
  onRouteChange?: (route: string) => void;
  transport?: CourierTransport | Transport;
  userId?: string;
  userSignature?: string;
  wsOptions?: WSOptions;
}
export interface ICourierContext extends ICourierProviderProps {
  dispatch: (action: { type: string; payload?: any; meta?: any }) => void;
  clientSourceId: string;
}
