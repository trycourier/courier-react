import { ITab, InboxProps } from "~/types";
import { IMessage } from "@trycourier/react-provider";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  currentTab?: ITab;
  labels: InboxProps["labels"];
  markAllAsRead?: () => any;
  messages: IMessage[];
  title?: string;
  unreadMessageCount?: number;
}
