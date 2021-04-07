import React, { useMemo } from "react";
import classNames from "classnames";
import distanceInWords from "date-fns/formatDistanceStrict";
import { useTrackEvent } from "@trycourier/react-provider";
import OptionsDropdown from "../OptionsDropdown";
import Actions from "../Actions";
import {
  Body,
  Container,
  Contents,
  getIcon,
  TimeAgo,
  Title,
  UnreadMarker,
} from "./styled";
import useInbox from "~/hooks/use-inbox";
import { MESSAGE_LABELS } from "~/constants";

interface MessageProps {
  unread?: number;
  messageId: string;
  created: number;
  title: string;
  body: string;
  icon?: string;
  read: boolean;
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

const Message: React.FunctionComponent<MessageProps> = ({
  created,
  title,
  body,
  icon,
  data,
  read,
  messageId,
  trackingIds = {},
}) => {
  const { readTrackingId, unreadTrackingId } = trackingIds || {};
  const { config, markMessageRead, markMessageUnread } = useInbox();
  const renderedIcon = getIcon(icon ?? config?.defaultIcon);
  const { trackEvent } = useTrackEvent();

  const timeAgo = useMemo(() => {
    if (!created) {
      return;
    }

    return distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }, [created]);

  const showMarkAsRead = !read && readTrackingId;
  const showMarkAsUnread = read && unreadTrackingId;
  const actions = useMemo(
    () =>
      [
        data?.clickAction && {
          href: data?.clickAction,
          label: "View Details",
          onClick: () => {
            if (trackingIds?.clickTrackingId) {
              trackEvent({
                trackingId: trackingIds?.clickTrackingId,
              });
            }
          },
        },
      ].filter(Boolean),
    [data]
  );

  const options = useMemo(
    () =>
      [
        showMarkAsRead && {
          label: MESSAGE_LABELS.MARK_AS_READ,
          onClick: () => {
            markMessageRead(messageId, readTrackingId);
          },
        },

        showMarkAsUnread && {
          label: MESSAGE_LABELS.MARK_AS_UNREAD,
          onClick: () => {
            markMessageUnread(messageId, unreadTrackingId);
          },
        },
      ].filter(Boolean),
    [
      markMessageRead,
      markMessageUnread,
      messageId,
      readTrackingId,
      showMarkAsRead,
      showMarkAsUnread,
      unreadTrackingId,
    ]
  );
  return (
    <Container
      data-testid="inbox-message"
      className={classNames({
        read,
      })}
    >
      {!read && <UnreadMarker />}
      {renderedIcon}
      <Contents>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </Contents>
      <Actions actions={actions} />
      {options?.length ? <OptionsDropdown options={options} /> : undefined}
    </Container>
  );
};

export default Message;
