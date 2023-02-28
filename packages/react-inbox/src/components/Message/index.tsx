import React, { useRef } from "react";
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
import {
  IActionElemental,
  IInboxMessagePreview,
} from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import { InboxProps } from "../../types";

import { getTimeAgo, getPrettyDate } from "~/lib";
import { useMessageOptions, useOnScreen } from "~/hooks";
import Markdown from "markdown-to-jsx";

const Message: React.FunctionComponent<
  IInboxMessagePreview & {
    labels: InboxProps["labels"];
    formatDate: InboxProps["formatDate"];
    defaultIcon: InboxProps["defaultIcon"];
    openLinksInNewTab: InboxProps["openLinksInNewTab"];
  }
> = ({
  actions,
  preview,
  created,
  data,
  defaultIcon,
  formatDate,
  icon,
  labels,
  messageId,
  opened,
  openLinksInNewTab,
  read,
  title,
  trackingIds = {},
}) => {
  const ref = useRef(null);
  const { readTrackingId, unreadTrackingId, openTrackingId } =
    trackingIds || {};
  const { brand, markMessageRead, markMessageOpened } = useInbox();

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

  const formattedTime = formatDate ? formatDate(created) : getTimeAgo(created);
  const prettyDate = getPrettyDate(created);

  const messageOptions = useMessageOptions({
    read,
    labels,
    messageId,
    readTrackingId,
    unreadTrackingId,
  });

  const handleMarkAsReadOnClick = () => {
    if (!read && messageId) {
      markMessageRead(messageId);
    }
  };

  useOnScreen(ref, () => {
    if (!openTrackingId || opened || !messageId) {
      return;
    }

    markMessageOpened(messageId);
  });

  return (
    <Container
      ref={ref}
      data-testid="inbox-message"
      className={classNames({
        read,
      })}
    >
      {!read && <UnreadIndicator />}
      {renderedIcon}
      <Contents>
        <Title>{title}</Title>
        <TextBlock>{preview && <Markdown>{preview}</Markdown>}</TextBlock>
        {data?.clickAction && (
          <ActionBlock>
            <a href={data?.clickAction} target="_blank" rel="noreferrer">
              View Details
            </a>
          </ActionBlock>
        )}
        {actions?.map(
          (
            e: IActionElemental & {
              openInNewTab?: boolean;
            },
            index: number
          ) => {
            let actionProps: {
              target?: string;
              rel?: string;
              onClick: (event: React.MouseEvent) => void;
            } = {
              onClick: handleMarkAsReadOnClick,
            };

            const openInNewTab =
              typeof e.openInNewTab === "boolean"
                ? e.openInNewTab
                : openLinksInNewTab;

            if (openInNewTab) {
              actionProps = {
                ...actionProps,
                target: "_blank",
                rel: "noreferrer",
              };
            }

            return (
              <ActionBlock key={index}>
                <a href={e.href} {...actionProps}>
                  {e.content}
                </a>
              </ActionBlock>
            );
          }
        )}
      </Contents>
      <TimeAgo title={prettyDate}>{formattedTime}</TimeAgo>
      {messageOptions?.length ? (
        <OptionsDropdown options={messageOptions} />
      ) : undefined}
    </Container>
  );
};

export default Message;
