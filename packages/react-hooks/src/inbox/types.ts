import { Brand, IActionBlock, ITextBlock } from "@trycourier/react-provider";

export interface ITab {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
}

export interface IMessage {
  unread?: number;
  messageId: string;
  created: number;
  title: string;
  body: string;
  blocks?: Array<IActionBlock | ITextBlock>;
  icon?: string;
  read?: boolean;
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

export interface IInbox {
  brand?: Brand;
  isOpen?: boolean;
  tabs?: ITab[];
  currentTab?: ITab;
  isLoading?: boolean;
  messages?: Array<IMessage>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
}
