import distanceInWords from "date-fns/formatDistanceStrict";
import { MESSAGE_LABELS } from "~/constants";

export const getTimeAgo = (created: string) => {
  return (
    created &&
    distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    })
  );
};

export const useMessageOptions = ({
  labels,
  markMessageRead,
  markMessageUnread,
  messageId,
  readTrackingId,
  showMarkAsRead,
  showMarkAsUnread,
  unreadTrackingId,
}) => {
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
