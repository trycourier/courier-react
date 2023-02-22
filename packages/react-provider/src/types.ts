import { CourierTransport, Transport } from "./transports";
import { IActionBlock, Interceptor, ITextBlock } from "./transports/types";
import { ErrorEvent } from "reconnecting-websocket";

export type ErrorEventHandler = (event: ErrorEvent) => void;

export interface IMessage {
  blocks?: Array<IActionBlock | ITextBlock>;
  body?: string;
  created: string;
  icon?: string;
  messageId: string;
  opened?: string;
  read?: boolean;
  title?: string;
  data?: {
    clickAction?: string;
  };
  trackingIds?: {
    archiveTrackingId: string;
    clickTrackingId: string;
    deliverTrackingId: string;
    openTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}

export type WSOptions = {
  url?: string;
  onError?: ErrorEventHandler;
  onClose?: () => void;
  onReconnect?: () => void;
  connectionTimeout?: number;
};

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
  id?: string;
  apiUrl?: string;
  inboxApiUrl?: string;
  authorization?: string;
  brand?: Brand;
  brandId?: string;
  clientKey?: string;
  middleware?: any;
  localStorage?: Storage;
  onMessage?: Interceptor;
  transport?: CourierTransport | Transport;
  userId?: string;
  userSignature?: string;
  wsOptions?: WSOptions;
}
export interface ICourierContext extends ICourierProviderProps {
  dispatch: (action: { type: string; payload?: any; meta?: any }) => void;
  clientSourceId: string;
}
