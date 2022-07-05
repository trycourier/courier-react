import { IMessage, ITab, InboxProps } from "~/types";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  currentTab?: ITab;
  labels: InboxProps["labels"];
  markAllAsRead?: () => any;
  messages: IMessage[];
  title: string;
  unreadMessageCount?: number;
}
