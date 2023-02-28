import { useInbox } from "@trycourier/react-hooks";
import { MESSAGE_LABELS } from "~/constants";
import { InboxProps } from "~/types";

export interface IMessageOption {
  label: string;
  onClick: (event: React.MouseEvent) => void;
}

interface IMessageOptions {
  archiveTrackingId?: string;
  labels: InboxProps["labels"];
  messageId?: string;
  read?: string;
  readTrackingId?: string;
  showArchived?: boolean;
  unreadTrackingId?: string;
}

const useMessageOptions = ({
  labels,
  messageId,
  read,
  showArchived,
}: IMessageOptions): Array<IMessageOption> => {
  const { markMessageRead, markMessageUnread, markMessageArchived } =
    useInbox();

  const messageOptions: Array<IMessageOption> = [];

  if (!read && messageId) {
    messageOptions.push({
      label: labels?.markAsRead ?? MESSAGE_LABELS.MARK_AS_READ,
      onClick: () => {
        markMessageRead(messageId);
      },
    });
  }

  if (read && messageId) {
    messageOptions.push({
      label: labels?.markAsUnread ?? MESSAGE_LABELS.MARK_AS_UNREAD,
      onClick: () => {
        markMessageUnread(messageId);
      },
    });
  }

  if (showArchived && messageId) {
    messageOptions.push({
      label: labels?.archiveMessage ?? MESSAGE_LABELS.ARCHIVE_MESSAGE,
      onClick: () => {
        markMessageArchived(messageId);
      },
    });
  }

  return messageOptions;
};

export default useMessageOptions;
