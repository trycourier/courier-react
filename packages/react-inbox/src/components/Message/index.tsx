import React, { useMemo } from "react";
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
import useTrackEvent from "~/hooks/use-track-event";

import distanceInWords from "date-fns/formatDistanceStrict";
import OptionsDropdown from "../OptionsDropdown";
import Actions from "../Actions";

interface MessageProps {
  unread?: number;
  messageId: string;
  created: number;
  title: string;
  body: string;
  icon?: string;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    clickTrackingId: string;
    readTrackingId: string;
    deliveredTrackingId: string;
  };
}

const Message: React.FunctionComponent<MessageProps> = ({
  created,
  title,
  body,
  icon,
  data,
  unread,
  trackingIds,
  messageId,
}) => {
  const { config } = useInbox();
  const [_, trackEvent] = useTrackEvent();
  const renderedIcon = getIcon(icon ?? config?.defaultIcon);

  const timeAgo = useMemo(() => {
    return distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    });
  }, [created]);

  const actions = useMemo(() => {
    return [{ href: data?.clickAction, label: "View Details" }];
  }, [data]);

  const options = useMemo(
    () => [
      {
        label: "Mark as read",
        onClick: () => {
          if (!trackingIds?.readTrackingId) {
            return;
          }

          trackEvent({
            trackingId: trackingIds?.readTrackingId,
          });
        },
      },
      {
        label: "Delete",
        onClick: () => {},
      },
    ],
    [trackingIds]
  );

  return (
    <Container data-testid="inbox-message">
      {unread && <UnreadMarker />}
      {renderedIcon}
      {messageId}
      <Contents>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </Contents>
      <Actions actions={actions} />
      <OptionsDropdown options={options} />
    </Container>
  );
};

export default Message;
