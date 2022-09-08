import React, { ReactNode, useMemo } from "react";
import classNames from "classnames";
import { IActionBlock, ITextBlock } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import { TextBlock, getIcon, TimeAgo, Title } from "../Message/styled";
import { InboxProps } from "../../types";

import { getTimeAgo } from "~/lib";
import Markdown from "markdown-to-jsx";

import deepExtend from "deep-extend";
import styled from "styled-components";
import useMessageOptions, { IMessageOption } from "~/hooks/use-message-options";
import OptionsDropdown from "../OptionsDropdown";

export interface IMessageProps {
  blocks?: Array<ITextBlock | IActionBlock>;
  created: string;
  icon?: string;
  messageId: string;
  read?: boolean;
  title: string;
  unread?: number;
  data?: {
    clickAction: string;
  };
  trackingIds?: {
    clickTrackingId: string;
    deliverTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}

const containerStyles = ({ theme }) =>
  deepExtend(
    {
      display: "flex",
      position: "relative",
      padding: "10px",
      backgroundColor: "#F9FAFB",
      alignItems: "center",
      borderBottom: "1px solid rgba(203,213,224,.5)",
      "&.read": {
        filter: "grayscale(60%)",
        background: "#F2F6F9",
      },
      "&:not(.read):hover": {
        background:
          "linear-gradient(180deg, rgba(33, 150, 243, 0.24) 0%, rgba(33, 150, 243, 0.096) 100%)",
      },
    },
    theme.message?.container ?? {}
  );

const DefaultContainer = styled.div(containerStyles);
const ClickableContainer = styled.a(containerStyles);

const Contents = styled.a(({ theme }) => ({
  marginRight: "auto",
  textAlign: "left",
  ...theme.message?.contents,
}));

const UnreadIndicator = styled.div(({ theme }) =>
  deepExtend(
    {
      height: "100%",
      width: 2,
      backgroundColor: theme?.brand?.colors?.primary ?? "#9121c2",
      position: "absolute",
      left: "1px",
    },
    theme?.message?.unreadIndicator
  )
);
const Message: React.FunctionComponent<{
  formattedTime?: string;
  read?: boolean;
  renderedIcon: ReactNode;
  renderTextBlock?: React.FunctionComponent<ITextBlock>;
  textBlocks: ITextBlock[];
  title?: string;
  messageOptions: IMessageOption[];
}> = ({
  read,
  formattedTime,
  renderedIcon,
  renderTextBlock,
  textBlocks,
  title,
  messageOptions,
}) => {
  return (
    <>
      {!read && <UnreadIndicator />}
      {renderedIcon}
      <Contents>
        <Title>{title}</Title>
        {textBlocks?.map((block: ITextBlock, index: number) => {
          if (renderTextBlock) {
            const Block = renderTextBlock;
            return <Block {...block} key={index} />;
          }

          return (
            <TextBlock key={index} data-testid="message-body">
              {block.text && <Markdown>{block.text}</Markdown>}
            </TextBlock>
          );
        })}
      </Contents>
      <TimeAgo>{formattedTime}</TimeAgo>
      {messageOptions?.length ? (
        <OptionsDropdown options={messageOptions} />
      ) : undefined}
    </>
  );
};

const MessageContainer: React.FunctionComponent<
  IMessageProps & {
    labels: InboxProps["labels"];
    formatDate: InboxProps["formatDate"];
    defaultIcon: InboxProps["defaultIcon"];
    openLinksInNewTab: InboxProps["openLinksInNewTab"];
    renderBlocks: InboxProps["renderBlocks"];
  }
> = ({
  blocks,
  created,
  data,
  defaultIcon,
  labels,
  formatDate,
  messageId,
  icon,
  openLinksInNewTab,
  read,
  renderBlocks,
  title,
  trackingIds = {},
}) => {
  const { brand } = useInbox();

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

  const { readTrackingId, unreadTrackingId } = trackingIds || {};
  const showMarkAsRead = !read && readTrackingId;
  const showMarkAsUnread = read && unreadTrackingId;

  const messageOptions = useMessageOptions({
    labels,
    messageId,
    readTrackingId,
    showMarkAsRead,
    showMarkAsUnread,
    unreadTrackingId,
  });

  const blocksByType = useMemo(() => {
    return blocks?.reduce(
      (acc, cur) => {
        if (cur.type === "text") {
          acc.text.push(cur);
        }

        if (cur.type === "action") {
          acc.action.push(cur);
        }

        return acc;
      },
      {
        action: [],
        text: [],
      } as {
        action: IActionBlock[];
        text: ITextBlock[];
      }
    );
  }, [blocks]);

  const handleMessageOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const clickAction = useMemo(() => {
    if (data?.clickAction) {
      return data.clickAction;
    }

    if (!blocksByType?.action.length || blocksByType.action?.length > 1) {
      return;
    }

    return blocksByType.action[0].url;
  }, []);

  let containerProps: {
    href?: string;
    target?: string;
    rel?: string;
    "data-testid": string;
    className: string;
    onClick: (event: React.MouseEvent) => void;
  } = {
    onClick: handleMessageOnClick,
    "data-testid": "inbox-message",
    className: classNames({
      read,
    }),
  };

  if (clickAction) {
    containerProps.href = clickAction;

    if (openLinksInNewTab) {
      containerProps = {
        ...containerProps,
        target: "_blank",
        rel: "noreferrer",
      };
    }
  }

  const renderedMessage = useMemo(() => {
    return (
      <Message
        formattedTime={formattedTime}
        read={read}
        renderedIcon={renderedIcon}
        renderTextBlock={renderBlocks?.text}
        textBlocks={blocksByType?.text ?? []}
        title={title}
        messageOptions={messageOptions}
      />
    );
  }, [
    blocksByType?.text,
    formattedTime,
    messageOptions,
    read,
    renderBlocks?.text,
    renderedIcon,
    title,
  ]);

  return containerProps.href ? (
    <ClickableContainer {...containerProps}>
      {renderedMessage}
    </ClickableContainer>
  ) : (
    <DefaultContainer {...containerProps}>{renderedMessage}</DefaultContainer>
  );
};

export default MessageContainer;
