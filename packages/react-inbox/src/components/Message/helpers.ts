import { useCourier } from "@trycourier/react-provider";
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

export const useMessageOptions = ({
  showMarkAsRead,
  showMarkAsUnread,
  markMessageRead,
  markMessageUnread,
  messageId,
  readTrackingId,
  unreadTrackingId,
}) => {
  const { inbox } = useCourier();
  return [
    showMarkAsRead && {
      label: inbox?.labels?.markAsRead ?? MESSAGE_LABELS.MARK_AS_READ,
      onClick: () => {
        markMessageRead(messageId, readTrackingId || "");
      },
    },

    showMarkAsUnread && {
      label: inbox?.labels?.markAsUnread ?? MESSAGE_LABELS.MARK_AS_UNREAD,
      onClick: () => {
        markMessageUnread(messageId, unreadTrackingId || "");
      },
    },
  ].filter(Boolean);
};
