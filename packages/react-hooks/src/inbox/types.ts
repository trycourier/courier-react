import { IGetInboxMessagesParams } from "@trycourier/client-graphql";
import { Brand, IInboxMessagePreview } from "@trycourier/core";
import { OnEvent } from "@trycourier/react-provider";
export interface IInbox<T = IInboxMessagePreview> {
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMarkedAllRead?: number;
  lastMessagesFetched?: number;
  messages?: Array<T>;
  onEvent?: OnEvent;
  pinned?: Array<T>;
  recentlyArchiveMessageIds?: Array<string>;
  searchParams?: IGetInboxMessagesParams;
  startCursor?: string;
  tenantId?: string;
  unreadMessageCount?: number;
  view?: string | "preferences";
}
