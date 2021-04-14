import React from "react";
import classNames from "classnames";
import OptionsDropdown from "../OptionsDropdown";
import Actions from "../Actions";
import {
  Body,
  Container,
  Contents,
  getIcon,
  TimeAgo,
  Title,
  UnreadIndicator,
} from "./styled";
import useInbox from "~/hooks/use-inbox";
import { IMessageProps } from "./types";
import { getActions, getOptions, getTimeAgo } from "./helpers";
import useInboxActions from "~/hooks/use-actions";
import { useCourier } from "@trycourier/react-provider";

const Message: React.FunctionComponent<IMessageProps> = ({
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
  const { createTrackEvent } = useCourier();
  const { markMessageRead, markMessageUnread } = useInboxActions();
  const { config } = useInbox();
  const renderedIcon = getIcon(icon ?? config?.defaultIcon);
  const timeAgo = getTimeAgo(created);
  const showMarkAsRead = !read && readTrackingId;
  const showMarkAsUnread = read && unreadTrackingId;
  const buttonActions = getActions({
    clickAction: data?.clickAction,
    trackingIds,
    trackEvent: createTrackEvent,
  });

  const options = getOptions({
    showMarkAsRead,
    showMarkAsUnread,
    markMessageRead,
    markMessageUnread,
    messageId,
    readTrackingId,
    unreadTrackingId,
  });

  return (
    <Container
      data-testid="inbox-message"
      className={classNames({
        read,
      })}
    >
      {!read && <UnreadIndicator />}
      {renderedIcon}
      <Contents>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <TimeAgo>{timeAgo}</TimeAgo>
      </Contents>
      <Actions actions={buttonActions} />
      {options?.length ? <OptionsDropdown options={options} /> : undefined}
    </Container>
  );
};

export default Message;
