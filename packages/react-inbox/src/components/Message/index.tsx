import React, { useEffect } from "react";
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
import { IActionBlock, ITextBlock } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import { IMessageProps } from "./types";
import { InboxProps } from "../../types";

import { getTimeAgo, getPrettyDate } from "~/lib";
import { useMessageOptions } from "~/hooks";
import Markdown from "markdown-to-jsx";

const Message: React.FunctionComponent<
  IMessageProps & {
    labels: InboxProps["labels"];
    formatDate: InboxProps["formatDate"];
    defaultIcon: InboxProps["defaultIcon"];
    openLinksInNewTab: InboxProps["openLinksInNewTab"];
    renderBlocks: InboxProps["renderBlocks"];
  }
> = ({
  blocks,
  body,
  created,
  data,
  defaultIcon,
  formatDate,
  icon,
  labels,
  messageId,
  openLinksInNewTab,
  read,
  renderBlocks,
  title,
  trackingIds = {},
}) => {
  const { readTrackingId, unreadTrackingId, openTrackingId } =
    trackingIds || {};
  console.log("trackingIds", trackingIds);
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
    if (!read) {
      markMessageRead(messageId);
    }
  };

  useEffect(() => {
    console.log("openTrackingId", openTrackingId);
    if (!openTrackingId) {
      return;
    }

    markMessageOpened(openTrackingId);
  }, [openTrackingId]);

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
          blocks?.map((block: ITextBlock | IActionBlock, index: number) => {
            if (block.type === "text") {
              if (renderBlocks?.text) {
                const Block = renderBlocks?.text;
                return <Block {...block} key={index} />;
              }

              return (
                <TextBlock key={index} data-testid="message-body">
                  {block.text && <Markdown>{block.text}</Markdown>}
                </TextBlock>
              );
            }

            if (block.type === "action") {
              if (renderBlocks?.action) {
                const Block = renderBlocks?.action;
                return <Block {...block} key={index} />;
              }

              let actionProps: {
                target?: string;
                rel?: string;
                onClick: (event: React.MouseEvent) => void;
              } = {
                onClick: handleMarkAsReadOnClick,
              };

              const openInNewTab =
                typeof block.openInNewTab === "boolean"
                  ? block.openInNewTab
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
                  <a href={block.url} {...actionProps}>
                    {block.text}
                  </a>
                </ActionBlock>
              );
            }
          })
        ) : (
          <>
            <TextBlock>{body && <Markdown>{body}</Markdown>}</TextBlock>
            {data?.clickAction && (
              <ActionBlock>
                <a href={data?.clickAction} target="_blank" rel="noreferrer">
                  View Details
                </a>
              </ActionBlock>
            )}
          </>
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
