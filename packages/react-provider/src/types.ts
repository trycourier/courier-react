import { CourierTransport, Transport } from "./transports";
import { IInboxMessagePreview, Interceptor } from "./transports/types";
import { ErrorEvent } from "reconnecting-websocket";
export { IInboxMessagePreview } from "@trycourier/client-graphql";

export { Interceptor } from "./transports/types";
export type ErrorEventHandler = (event: ErrorEvent) => void;

export type WSOptions = {
  url?: string;
  onError?: ErrorEventHandler;
  onClose?: () => void;
  onReconnect?: () => void;
  connectionTimeout?: number;
};

export type OnEvent = (eventParams: {
  messageId?: string;
  message?: IInboxMessagePreview;
  event: EventType;
}) => void;

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
    renderActionsAsButtons?: boolean;
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

export type EventType =
  | "mark-all-read"
  | "read"
  | "unread"
  | "archive"
  | "opened"
  | "click"
  | "unpin";

export interface ThemeVariables {
  background?: string;
  textColor?: string;
  titleColor?: string;
  textColorRead?: string;
  structure?: string;
  icon?: string;
}

export interface ProviderTheme {
  colorMode?: "dark" | "light";
  variables?: ThemeVariables;
}
export interface ICourierProviderProps {
  apiUrl?: string;
  applyMiddleware?: (defaultMiddleware: any) => any[];
  authorization?: string;
  brand?: Brand;
  brandId?: string;
  clientKey?: string;
  id?: string;
  inboxApiUrl?: string;
  localStorage?: Storage;
  onMessage?: Interceptor;
  onRouteChange?: (route: string) => void;
  tenantId?: string;
  theme?: ProviderTheme;
  transport?: CourierTransport | Transport;
  userId?: string;
  userSignature?: string;
  wsOptions?: WSOptions;
}
export interface ICourierContext extends ICourierProviderProps {
  dispatch: (action: { type: string; payload?: any; meta?: any }) => void;
  clientSourceId: string;
}
