import { Brand, IInboxMessagePreview } from "@trycourier/core";
import { OnEvent } from "@trycourier/react-provider";
export interface IInbox<T = IInboxMessagePreview> {
  tenantId?: string;
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMarkedAllRead?: number;
  lastMessagesFetched?: number;
  messages?: Array<T>;
  onEvent?: OnEvent;
  pinned?: Array<T>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: string | "preferences";
}
