import { InboxProps } from "~/types";
import { IInboxMessagePreview } from "@trycourier/react-provider";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  labels: InboxProps["labels"];
  markAllAsRead?: () => any;
  messages: IInboxMessagePreview[];
  title?: string;
  unreadMessageCount?: number;
}
