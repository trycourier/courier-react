import { useInbox } from "@trycourier/react-hooks";
import { MESSAGE_LABELS } from "~/constants";

export interface IMessageOption {
  label: string;
  onClick: (event: React.MouseEvent) => void;
}

const useMessageOptions = ({
  labels,
  messageId,
  readTrackingId,
  showMarkAsRead,
  showMarkAsUnread,
  unreadTrackingId,
}): Array<IMessageOption> => {
  const { markMessageRead, markMessageUnread } = useInbox();

  return [
    showMarkAsRead && {
      label: labels?.markAsRead ?? MESSAGE_LABELS.MARK_AS_READ,
      onClick: () => {
        markMessageRead(messageId, readTrackingId || "");
      },
    },

    showMarkAsUnread && {
      label: labels?.markAsUnread ?? MESSAGE_LABELS.MARK_AS_UNREAD,
      onClick: () => {
        markMessageUnread(messageId, unreadTrackingId || "");
      },
    },
  ].filter(Boolean);
};

export default useMessageOptions;
