import { Brand, IInboxMessagePreview } from "@trycourier/react-provider";

export interface IInbox<T = IInboxMessagePreview> {
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMarkedAllRead?: number;
  lastMessagesFetched?: number;
  messages?: Array<T>;
  pinned?: Array<T>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
}
