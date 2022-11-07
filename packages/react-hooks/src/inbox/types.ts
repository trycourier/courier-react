import { Brand, IMessage } from "@trycourier/react-provider";

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

export interface IInbox<T = IMessage> {
  brand?: Brand;
  currentTab?: ITab;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMarkedAllRead?: number;
  lastMessagesFetched?: number;
  markingAllAsRead?: boolean;
  messages?: Array<T>;
  startCursor?: string;
  tabs?: ITab[];
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
}
