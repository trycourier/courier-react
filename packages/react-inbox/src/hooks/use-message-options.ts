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
  messageId: string;
  read?: boolean;
  readTrackingId?: string;
  showArchived?: boolean;
  unreadTrackingId?: string;
}

const useMessageOptions = ({
  archiveTrackingId,
  labels,
  messageId,
  read,
  readTrackingId,
  showArchived,
  unreadTrackingId,
}: IMessageOptions): Array<IMessageOption> => {
  const { markMessageRead, markMessageUnread, markMessageArchived } =
    useInbox();

  const messageOptions: Array<IMessageOption> = [];

  if (!read && readTrackingId) {
    messageOptions.push({
      label: labels?.markAsRead ?? MESSAGE_LABELS.MARK_AS_READ,
      onClick: () => {
        markMessageRead(messageId, readTrackingId);
      },
    });
  }

  if (read && unreadTrackingId) {
    messageOptions.push({
      label: labels?.markAsUnread ?? MESSAGE_LABELS.MARK_AS_UNREAD,
      onClick: () => {
        markMessageUnread(messageId, unreadTrackingId);
      },
    });
  }

  if (showArchived && archiveTrackingId) {
    messageOptions.push({
      label: labels?.archiveMessage ?? MESSAGE_LABELS.ARCHIVE_MESSAGE,
      onClick: () => {
        markMessageArchived(messageId, archiveTrackingId);
      },
    });
  }

  return messageOptions;
};

export default useMessageOptions;
