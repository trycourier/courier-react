interface TextBlock {
  type: "text";
  text: string;
}
interface ActionBlock {
  type: "action";
  text: string;
  url: string;
}
export interface IMessageProps {
  unread?: number;
  messageId: string;
  created: number;
  title: string;
  body: string;
  blocks?: Array<TextBlock | ActionBlock>;
  icon?: string;
  read?: boolean;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    clickTrackingId: string;
    deliveredTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}
