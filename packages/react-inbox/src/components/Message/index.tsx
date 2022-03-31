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
import { useMessageOptions, getTimeAgo } from "./helpers";
import { IActionBlock, ITextBlock } from "@trycourier/react-provider";
import Markdown from "markdown-to-jsx";

const Message: React.FunctionComponent<IMessageProps> = ({
  blocks,
  body,
  created,
  data,
  icon,
  messageId,
  read,
  title,
  trackingIds = {},
}) => {
  const { readTrackingId, unreadTrackingId } = trackingIds || {};
  const {
    brand,
    defaultIcon,
    markMessageRead,
    markMessageUnread,
    openLinksInNewTab,
    renderBlocks,
  } = useInbox();

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

  const messageOptions = useMessageOptions({
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
          blocks?.map((block: ITextBlock | IActionBlock, index: number) => {
            if (block.type === "text") {
              if (renderBlocks?.text) {
                const Block = renderBlocks?.text;
                return <Block {...block} key={index} />;
              }

              return (
                <TextBlock key={index} data-testid="message-body">
                  <Markdown>{block.text}</Markdown>
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
              } = {};

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
            <TextBlock>
              <Markdown>{body}</Markdown>
            </TextBlock>
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
      <TimeAgo>{timeAgo}</TimeAgo>
      {messageOptions?.length ? (
        <OptionsDropdown options={messageOptions} />
      ) : undefined}
    </Container>
  );
};

export default Message;
