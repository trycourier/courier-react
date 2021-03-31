import React, { useMemo } from "react";
import classNames from "classnames";
import distanceInWords from "date-fns/formatDistanceStrict";
import { useTrackEvent } from "@trycourier/react-provider";

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

import OptionsDropdown from "../OptionsDropdown";
import Actions from "../Actions";

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
  trackingIds,
}) => {
  const { config, markMessageRead, markMessageUnread } = useInbox();
  const renderedIcon = getIcon(icon ?? config?.defaultIcon);
  const [_, trackEvent] = useTrackEvent();

  const timeAgo = useMemo(() => {
    if (!created) {
      return;
    }

    return distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }, [created]);

  const actions = useMemo(() => {
    return [
      {
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
    ];
  }, [data]);

  const options = useMemo(
    () =>
      [
        !read &&
          trackingIds?.readTrackingId && {
            label: "Mark as Read",
            onClick: () => {
              if (!trackingIds?.readTrackingId) {
                return;
              }

              markMessageRead(messageId, trackingIds?.readTrackingId);
            },
          },

        read &&
          trackingIds?.unreadTrackingId && {
            label: "Mark as Unread",
            onClick: () => {
              if (!trackingIds?.readTrackingId) {
                return;
              }

              markMessageUnread(messageId, trackingIds?.unreadTrackingId);
            },
          },
        /*{
        label: "Delete",
        onClick: () => {},
      },*/
      ].filter(Boolean),
    [read, messageId, trackingIds]
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
