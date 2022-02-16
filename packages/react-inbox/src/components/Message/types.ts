import { IActionBlock, ITextBlock } from "@trycourier/react-provider";
import { InboxProps } from "~/types";

export interface IMessageProps {
  blocks?: Array<ITextBlock | IActionBlock>;
  body: string;
  created: number;
  icon?: string;
  messageId: string;
  read?: boolean;
  renderBlocks?: InboxProps["renderBlocks"];
  title: string;
  unread?: number;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    clickTrackingId: string;
    deliveredTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}
