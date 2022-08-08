import { IActionBlock, ITextBlock } from "@trycourier/react-provider";

export interface IMessageProps {
  blocks?: Array<ITextBlock | IActionBlock>;
  body: string;
  created: string;
  icon?: string;
  messageId: string;
  read?: boolean;
  title: string;
  unread?: number;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    clickTrackingId: string;
    deliverTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}
