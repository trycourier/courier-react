import { Brand } from "../types";
export interface ITextBlock {
  type: "text";
  text: string;
}
export interface IActionBlock {
  type: "action";
  text: string;
  url: string;
  openInNewTab?: boolean;
}

export interface ICourierEventMessage {
  event: "read" | "unread" | "archive" | "mark-all-read";
  type: "event";
  messageId?: string;
  error?: string;
}
export interface ICourierMessage {
  blocks?: Array<ITextBlock | IActionBlock>;
  body?: string;
  data?: {
    channel?: string;
    brandId?: string;
    trackingIds?: {
      archiveTrackingId: string;
      channelTrackingId: string;
      clickTrackingId: string;
      deliverTrackingId: string;
      openTrackingId: string;
      readTrackingId: string;
      unreadTrackingId: string;
    };
    trackingUrl?: string;
    clickAction?: string;
  };
  error?: string;
  event?: string;
  icon?: string;
  messageId?: string;
  title?: string;
  type?: "message";
  brand?: Brand;
}

export interface IInboxMessagePreview {
  type: "message";
  created?: string;
  messageId: string;
  preview?: string;
  /** ISO 8601 date the message was read */
  read?: string;
  title?: string;
}

export interface ICourierEvent {
  type?: "message" | "event";
  data?: ICourierMessage | IInboxMessagePreview | ICourierEventMessage;
}

export type ICourierEventCallback = (event: ICourierEvent) => void;

export type Interceptor = (
  message?: ICourierMessage | ICourierEventMessage | IInboxMessagePreview
) => ICourierMessage | undefined;
