export interface ICourierEventMessage {
  event: "read" | "unread" | "archive" | "mark-all-read" | "opened";
  type: "event";
  messageId?: string;
  error?: string;
}

export interface ITextElemental {
  type: "text";
  content: string;
}

export interface IActionElemental {
  background_color?: string;
  type: "action";
  content: string;
  href: string;
  data?: Record<string, any>;
}

export interface IInboxMessagePreview {
  type: "message";
  created: string;
  messageId: string;
  actions?: Array<IActionElemental>;
  preview?: string;
  icon?: string;
  opened?: string;
  data?: Record<string, any>;
  /** ISO 8601 date the message was read */
  read?: string;
  title?: string;
  trackingIds?: {
    openTrackingId?: string;
    archiveTrackingId?: string;
    clickTrackingId?: string;
    deliverTrackingId?: string;
    readTrackingId?: string;
    unreadTrackingId?: string;
  };
}

export interface ICourierEvent {
  type?: "message" | "event";
  data?: IInboxMessagePreview | ICourierEventMessage;
}

export type ICourierEventCallback = (event: ICourierEvent) => void;

export type Interceptor = (
  message?: ICourierEventMessage | IInboxMessagePreview
) => IInboxMessagePreview | ICourierEventMessage | undefined;
