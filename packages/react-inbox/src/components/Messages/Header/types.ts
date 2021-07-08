import { IMessage, ITab } from "~/types";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  title: string;
  unreadMessageCount?: number;
  markAllAsRead?: () => any;
  currentTab?: ITab;
  messages: IMessage[];
}
