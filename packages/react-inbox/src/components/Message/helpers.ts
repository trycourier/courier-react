import distanceInWords from "date-fns/formatDistanceStrict";
import { MESSAGE_LABELS } from "~/constants";

export const getTimeAgo = (created: number) => {
  return (
    created &&
    distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    })
  );
};

export const getAction = ({ clickAction, trackingIds, trackEvent }) => {
  if (!clickAction) {
    return;
  }

  return {
    href: clickAction,
    label: "View Details",
    onClick: () => {
      if (trackingIds?.clickTrackingId) {
        trackEvent({
          trackingId: trackingIds?.clickTrackingId,
        });
      }
    },
  };
};

export const getOptions = ({
  showMarkAsRead,
  showMarkAsUnread,
  markMessageRead,
  markMessageUnread,
  messageId,
  readTrackingId,
  unreadTrackingId,
}) => {
  return [
    showMarkAsRead && {
      label: MESSAGE_LABELS.MARK_AS_READ,
      onClick: () => {
        markMessageRead(messageId, readTrackingId || "");
      },
    },

    showMarkAsUnread && {
      label: MESSAGE_LABELS.MARK_AS_UNREAD,
      onClick: () => {
        markMessageUnread(messageId, unreadTrackingId || "");
      },
    },
  ].filter(Boolean);
};
