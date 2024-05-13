import { ErrorEvent } from "reconnecting-websocket";
import { CourierTransport, Transport } from "./transports";
import { IInboxMessagePreview, Interceptor } from "./transports/types";
export { IInboxMessagePreview } from "@trycourier/client-graphql";

export { Interceptor } from "./transports/types";
export type ErrorEventHandler = (event: ErrorEvent) => void;

export type PreferenceStatus = "OPTED_IN" | "OPTED_OUT" | "REQUIRED";

export type RepeatOn = {
  sunday?: boolean;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
};

export interface DigestSchedule {
  period: string;
  repetition: string;
  scheduleId: string;
  default?: boolean;
  start: string;
  recurrence: string;
  repeat?: {
    frequency: number;
    interval: "day" | "week" | "month" | "year";
    on?: string | RepeatOn;
  };
  end?: number | string;
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId: string;
  defaultStatus: PreferenceStatus;
  digestSchedules?: DigestSchedule[];
}

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
  data?: Record<string, unknown>;
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
    renderActionsAsButtons?: boolean;
  };
  preferenceTemplates?: Array<IPreferenceTemplate>;
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

export type EventType =
  | "add-tag"
  | "archive"
  | "click"
  | "mark-all-read"
  | "opened"
  | "read"
  | "remove-tag"
  | "unpin"
  | "unread";

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
  clientSourceId?: string;
  dispatch: (action: { type: string; payload?: any; meta?: any }) => void;
  getBrand: (brandId?: string) => void;
  createTrackEvent: (trackingId: string) => void;
  identify?: (
    userId: string,
    payload: Record<string, unknown>
  ) => Promise<void>;
  subscribe: (userId: string, listId: string) => Promise<void>;
  track: (event: string, properties?: Record<string, unknown>) => Promise<void>;
  unsubscribe: (userId: string, listId: string) => Promise<void>;
  renewSession: (token: string) => void;
  pageVisible: () => void;
  init: (payload: Partial<ICourierContext>) => Promise<void>;
  wsReconnected: () => void;
}
