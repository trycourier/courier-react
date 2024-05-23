export interface ICourierEventMessage {
  event: "read" | "unread" | "archive" | "mark-all-read" | "opened" | "unpin";
  type: "event";
  messageId?: string;
  error?: string;
}

export interface IInboxMessage {
  messageId: string;
  read?: string;
  created?: string;
  content: {
    html?: string;
    elemental?: Array<ITextElemental | IActionElemental>;
  };
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
  archived?: string;
  created: string;
  messageId: string;
  pinned?: {
    slotId?: string;
  };
  actions?: Array<IActionElemental>;
  preview?: string;
  icon?: string;
  opened?: string;
  data?: Record<string, any>;
  /** ISO 8601 date the message was read */
  read?: string;
  tags?: string[];
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

import { ErrorEvent } from "reconnecting-websocket";
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
