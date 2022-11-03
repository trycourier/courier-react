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
    archiveTrackingId: string;
    clickTrackingId: string;
    deliverTrackingId: string;
    openTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}
