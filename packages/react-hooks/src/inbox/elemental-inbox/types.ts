import {
  IInboxMessage,
  IInboxMessagePreview,
} from "@trycourier/client-graphql";
import { Brand } from "@trycourier/react-provider";

export interface IElementalInbox {
  tenantId?: string;
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMessagesFetched?: number;
  messages?: Array<IInboxMessagePreview>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: string | "preferences";
}

export type IElementalInboxMessage = IInboxMessage;
export type IElementalInboxMessagePreview = IInboxMessagePreview;
