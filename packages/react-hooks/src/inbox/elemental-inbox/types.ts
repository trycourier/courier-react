import {
  IInboxMessage,
  IInboxMessagePreview,
} from "@trycourier/client-graphql";
import { Brand } from "@trycourier/react-provider";

export interface IElementalInbox {
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMessagesFetched?: number;
  messages?: Array<IElementalInboxMessagePreview>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: "messages" | "preferences";
}

export type IElementalInboxMessage = IInboxMessage;
export type IElementalInboxMessagePreview = IInboxMessagePreview;
