import { IInboxMessagePreview } from "@trycourier/core";
import { InboxProps } from "~/types";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  labels: InboxProps["labels"];
  markAllAsRead?: () => any;
  messages: IInboxMessagePreview[];
  title?: string;
  unreadMessageCount?: number;
}
