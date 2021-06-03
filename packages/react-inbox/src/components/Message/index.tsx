import React from "react";
import classNames from "classnames";
import OptionsDropdown from "../OptionsDropdown";
import {
  ActionBlock,
  TextBlock,
  Container,
  Contents,
  getIcon,
  TimeAgo,
  Title,
  UnreadIndicator,
} from "./styled";
import useInbox from "~/hooks/use-inbox";
import { IMessageProps } from "./types";
import { getAction, getOptions, getTimeAgo } from "./helpers";
import { useCourier } from "@trycourier/react-provider";

const Message: React.FunctionComponent<IMessageProps> = ({
  created,
  title,
  body,
  blocks,
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

    brand?.inapp?.disableMessageIcon
      ? false
      : (icon || defaultIcon) ?? brand?.inapp?.icons?.message
  );
  const timeAgo = getTimeAgo(created);
  const showMarkAsRead = !read && readTrackingId;
  const showMarkAsUnread = read && unreadTrackingId;

  const action = getAction({
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
        {blocks?.length ? (
          blocks?.map((block, index) => {
            if (block.type === "text") {
              return (
                <TextBlock key={index} data-testid="message-body">
                  {block.text}
                </TextBlock>
              );
            }

            if (block.type === "action") {
              return (
                <ActionBlock key={index} href={block.url} target="_blank">
                  {block.text}
                </ActionBlock>
              );
            }
          })
        ) : (
          <>
            <TextBlock>{body}</TextBlock>
            {action && (
              <ActionBlock href={action.href} target="_blank">
                {action.label}
              </ActionBlock>
            )}
          </>
        )}
      </Contents>
      <TimeAgo>{timeAgo}</TimeAgo>
      {options?.length ? <OptionsDropdown options={options} /> : undefined}
    </Container>
  );
};

export default Message;
