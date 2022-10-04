import React, { ReactNode, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { IActionBlock, ITextBlock } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import { TextBlock, getIcon, TimeAgo, Title } from "../Message/styled";
import { InboxProps } from "../../types";

import { getTimeAgoShort } from "~/lib";
import useHover from "~/hooks/use-hover";
import Markdown from "markdown-to-jsx";

import deepExtend from "deep-extend";
import styled from "styled-components";
import useMessageOptions, { IMessageOption } from "~/hooks/use-message-options";
import OptionsDropdown from "../OptionsDropdown";
import tinycolor2 from "tinycolor2";
import { useInView } from "react-intersection-observer";
import CloseInbox from "./actions/CloseInbox";

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
    archiveTrackingId: string;
    clickTrackingId: string;
    deliverTrackingId: string;
    readTrackingId: string;
    unreadTrackingId: string;
  };
}

const ClickableContainer = styled.a(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return deepExtend(
    {
      "text-decoration": "none",
      "*": {
        "text-decoration": "none",
      },
      "> div:hover": {
        background: `linear-gradient(180deg, ${tcPrimaryColor.setAlpha(
          0.2
        )} 0%, ${tcPrimaryColor.setAlpha(0.08)} 100%);`,
      },
    },
    theme.message?.clickableContainer ?? {}
  );
});

const Contents = styled.div(({ theme }) => ({
  marginRight: "auto",
  textAlign: "left",
  marginLeft: 12,
  ...theme.message?.contents,
}));

const UnreadIndicator = styled.div<{ read?: boolean }>(({ theme, read }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return deepExtend(
    {
      visibility: read ? "hidden" : "visible",
      height: "auto",
      width: 2,
      background: read
        ? "linear-gradient(180deg, rgba(86, 96, 116, 0.3) 0%, rgba(86, 96, 116, 0.12) 100%)"
        : `linear-gradient(180deg, ${primaryColor} 0%, ${tcPrimaryColor.setAlpha(
            0.4
          )} 100%)`,
      position: "absolute",
      left: "1px",
      top: "1px",
      bottom: "1px",
    },
    theme?.message?.unreadIndicator
  );
});

const MessageContainer = styled.div(({ theme }) => {
  return deepExtend(
    {
      display: "flex",
      position: "relative",
      padding: "12px",
      minHeight: 60,
      backgroundColor: "#F9FAFB",
      alignItems: "center",
      borderBottom: "1px solid rgb(222, 232, 240)",
      "&:hover": {
        zIndex: 1,
      },
      "&.read": {
        background: "#F2F6F9",
        ".icon": {
          filter: "grayscale(100%)",
          opacity: "0.3",
        },
      },

      ".actions": {
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: 6,
        right: 6,
      },
    },
    theme?.message?.container
  );
});

const Message: React.FunctionComponent<{
  archiveTrackingId?: string;
  formattedTime?: string;
  messageId: string;
  messageOptions: IMessageOption[];
  read?: boolean;
  renderedIcon: ReactNode;
  renderTextBlock?: React.FunctionComponent<ITextBlock>;
  textBlocks: ITextBlock[];
  title?: string;
}> = ({
  read,
  archiveTrackingId,
  messageId,
  formattedTime,
  renderedIcon,
  renderTextBlock,
  textBlocks,
  title,
  messageOptions,
}) => {
  const { autoMarkAsRead, markMessageArchived } = useInbox();
  const [hoverRef, isHovered] = useHover();
  const handleArchiveMessage = (event: React.MouseEvent) => {
    event?.preventDefault();
    if (!archiveTrackingId) {
      return;
    }

    markMessageArchived(messageId, archiveTrackingId);
  };

  return (
    <MessageContainer
      ref={hoverRef}
      className={classNames({
        read,
      })}
    >
      <UnreadIndicator read={read} />
      {renderedIcon}
      <Contents>
        <Title read={read}>{title}</Title>
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
      <div className="actions">
        {autoMarkAsRead && isHovered && archiveTrackingId ? (
          <CloseInbox
            size="small"
            onClick={handleArchiveMessage}
            tooltip="Archive Message"
          />
        ) : (
          <>
            <TimeAgo>{formattedTime}</TimeAgo>
            {read && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.14983 6.7125L2.71983 5.2825C2.32983 4.8925 1.69983 4.8925 1.30983 5.2825C0.919834 5.6725 0.919834 6.3025 1.30983 6.6925L3.79983 9.1925C4.18983 9.5825 4.81983 9.5825 5.20983 9.1925L10.6998 3.7025C11.0898 3.3125 11.0898 2.6825 10.6998 2.2925C10.3098 1.9025 9.67983 1.9025 9.28983 2.2925L4.85983 6.7225C4.65983 6.9225 4.34983 6.9225 4.14983 6.7225V6.7125Z"
                  fill="rgba(86, 96, 116, 0.3)"
                />
              </svg>
            )}
            {!autoMarkAsRead && messageOptions?.length ? (
              <OptionsDropdown options={messageOptions} />
            ) : undefined}
          </>
        )}
      </div>
    </MessageContainer>
  );
};

const MessageWrapper: React.FunctionComponent<
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
  const { brand, autoMarkAsRead, markMessageRead } = useInbox();
  const {
    readTrackingId,
    unreadTrackingId,
    archiveTrackingId,
    clickTrackingId,
  } = trackingIds || {};
  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout>();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (!inView || !autoMarkAsRead || read) {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
      return;
    }

    const timeout = setTimeout(() => {
      if (readTrackingId) {
        markMessageRead(messageId, String(readTrackingId));
      }

      setMessageTimeout(undefined);
    }, 5000);

    setMessageTimeout(timeout);
    return () => {
      clearTimeout(timeout);
    };
  }, [messageId, autoMarkAsRead, read, inView]);

  const handleClickMessage = () => {
    if (clickTrackingId) {
      // mark message read, but don't fire the event as the backend will do it for us,
      // we just want to set the message as read here in our local state
      markMessageRead(messageId);
    }
  };

  const renderedIcon = getIcon(
    /* priority:
      1. from message
      2. from props.defaultIcon
      3. from props.brand.inapp.icons.message
      4. from remote brand.inapp.icons.message
    */

    brand?.inapp?.disableMessageIcon
      ? false
      : (icon || defaultIcon) ?? brand?.inapp?.icons?.message,
    true // 36px icon
  );

  const formattedTime = formatDate
    ? formatDate(created)
    : getTimeAgoShort(created);

  const messageOptions = useMessageOptions({
    archiveTrackingId,
    labels,
    messageId,
    read,
    readTrackingId,
    showArchived: true,
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
    "data-testid": string;
    href?: string;
    onMouseDown?: (event: React.MouseEvent) => void;
    rel?: string;
    target?: string;
  } = {
    "data-testid": "inbox-message",
  };

  if (clickAction) {
    containerProps.href = clickAction;
    containerProps.onMouseDown = handleClickMessage;

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
        archiveTrackingId={trackingIds.archiveTrackingId}
        formattedTime={formattedTime}
        messageId={messageId}
        messageOptions={messageOptions}
        read={read}
        renderedIcon={renderedIcon}
        renderTextBlock={renderBlocks?.text}
        textBlocks={blocksByType?.text ?? []}
        title={title}
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
    <ClickableContainer {...containerProps} ref={ref}>
      {renderedMessage}
    </ClickableContainer>
  ) : (
    <div {...containerProps} ref={ref}>
      {renderedMessage}
    </div>
  );
};

export default MessageWrapper;
