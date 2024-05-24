import { CourierTransport, WSOptions } from "@trycourier/transport";
import { Interceptor } from "@trycourier/core";
import { Brand } from "@trycourier/core";
import { IInboxMessagePreview } from "@trycourier/core";

export interface ThemeVariables {
  background?: string;
  textColor?: string;
  titleColor?: string;
  textColorRead?: string;
  structure?: string;
  icon?: string;
}

export type OnEvent = (eventParams: {
  messageId?: string;
  message?: IInboxMessagePreview;
  event: string;
  data?: Record<string, unknown>;
}) => void;

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
  transport?: CourierTransport;
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
