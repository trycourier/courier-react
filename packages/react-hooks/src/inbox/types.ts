import { Brand, IActionBlock, ITextBlock } from "@trycourier/react-provider";

export interface ITab {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
  state?: {
    messages?: IMessage[];
    startCursor?: string;
  };
}

export interface IMessage {
  unread?: number;
  messageId: string;
  created: string;
  title: string;
  body: string;
  blocks?: Array<IActionBlock | ITextBlock>;
  icon?: string;
  read?: boolean;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    archiveTrackingId: string;
    clickTrackingId: string;
    deliverTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}

export interface IInbox {
  brand?: Brand;
  currentTab?: ITab;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  messages?: Array<IMessage>;
  startCursor?: string;
  tabs?: ITab[];
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
}
