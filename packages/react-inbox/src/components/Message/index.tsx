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
  const { createTrackEvent, brand: courierBrand } = useCourier();
  const {
    brand: inboxBrand,
    defaultIcon,
    markMessageRead,
    markMessageUnread,
  } = useInbox();

  const brand = inboxBrand ?? courierBrand;

  const renderedIcon = getIcon(
    /* priority:
      1. from message
      2. from props.defaultIcon
      3. from props.brand.inapp.icons.message
      4. from remote brand.inapp.icons.message
    */
    icon ||
      brand?.inapp?.icons?.message ||
      defaultIcon ||
      !brand?.inapp?.disableMessageIcon
  );
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
