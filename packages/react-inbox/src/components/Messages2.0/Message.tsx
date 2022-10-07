import React, { ReactNode, useMemo } from "react";
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
import tinycolor2 from "tinycolor2";
import CloseAction from "./actions/Close";
import MarkRead, { Checkmark } from "./actions/MarkRead";
import MarkUnread from "./actions/MarkUnread";

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
      ".message-container.hover": {
        background: tcPrimaryColor.setAlpha(0.14),
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

  return deepExtend(
    {
      visibility: read ? "hidden" : "visible",
      height: "auto",
      width: 2,
      background: primaryColor,
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
      transition: "background 200ms ease-in-out",
      display: "flex",
      position: "relative",
      padding: "12px",
      minHeight: 60,
      backgroundColor: "#F9FAFB",
      "&:not(.hasBody)": {
        alignItems: "center",
      },
      "&.hasBody": {
        alignItems: "top",
      },
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
        height: 24,
        alignItems: "center",

        ".close": {
          marginRight: -6,
          marginLeft: 6,
          marginTop: -3,
        },

        "> div": {
          display: "flex",
          alignItems: "center",
          transition: "opacity 200ms ease-in-out",
          visibility: "hidden",
          opacity: 0,
          "&:not(.visible)": {
            position: "absolute",
          },
          "&.visible": {
            opacity: 1,
            visibility: "visible",
          },
        },
      },
    },
    theme?.message?.container
  );
});

const Message: React.FunctionComponent<{
  trackingIds?: IMessageProps["trackingIds"];
  formattedTime?: string;
  messageId: string;
  read?: boolean;
  renderedIcon: ReactNode;
  renderTextBlock?: React.FunctionComponent<ITextBlock>;
  textBlocks: ITextBlock[];
  title?: string;
}> = ({
  read,
  trackingIds,
  messageId,
  formattedTime,
  renderedIcon,
  renderTextBlock,
  textBlocks,
  title,
}) => {
  const { markMessageArchived, markMessageRead, markMessageUnread } =
    useInbox();

  const [hoverRef, isHovered] = useHover();
  const [actionsHoverRef, areActionsHovered] = useHover();

  const handleEvent = (eventName: string) => (event: React.MouseEvent) => {
    event?.preventDefault();
    switch (eventName) {
      case "archived": {
        if (!trackingIds?.archiveTrackingId) {
          return;
        }

        markMessageArchived(messageId, trackingIds.archiveTrackingId);
        break;
      }

      case "read": {
        if (!trackingIds?.readTrackingId) {
          return;
        }

        markMessageRead(messageId, trackingIds.readTrackingId);
        break;
      }

      case "unread": {
        if (!trackingIds?.unreadTrackingId) {
          return;
        }

        markMessageUnread(messageId, trackingIds.unreadTrackingId);
        break;
      }
    }
  };

  return (
    <MessageContainer
      ref={hoverRef}
      className={classNames("message-container", {
        hover: isHovered && !areActionsHovered,
        read,
        hasBody: Boolean(textBlocks?.length),
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
      <div className="actions" ref={actionsHoverRef}>
        <div
          className={classNames({
            visible: true,
          })}
        >
          {!read && trackingIds?.readTrackingId && (
            <MarkRead onClick={handleEvent("read")} />
          )}
          {read && trackingIds?.unreadTrackingId && (
            <MarkUnread onClick={handleEvent("unread")} />
          )}
          {trackingIds?.archiveTrackingId && (
            <CloseAction
              size="small"
              onClick={handleEvent("archive")}
              tooltip="Archive Message"
            />
          )}
        </div>
        <div
          className={classNames({
            visible: false,
          })}
        >
          <TimeAgo>{formattedTime}</TimeAgo>
          {read && (
            <Checkmark
              style={{
                marginRight: -6,
                marginLeft: 6,
                marginTop: -3,
              }}
            />
          )}
        </div>
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
  formatDate,
  messageId,
  icon,
  openLinksInNewTab,
  read,
  renderBlocks,
  title,
  trackingIds,
}) => {
  const { brand, markMessageRead } = useInbox();

  const handleClickMessage = () => {
    if (trackingIds?.clickTrackingId) {
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
        formattedTime={formattedTime}
        messageId={messageId}
        read={read}
        renderedIcon={renderedIcon}
        renderTextBlock={renderBlocks?.text}
        textBlocks={blocksByType?.text ?? []}
        title={title}
        trackingIds={trackingIds}
      />
    );
  }, [
    blocksByType?.text,
    formattedTime,
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
    <div {...containerProps}>{renderedMessage}</div>
  );
};

export default MessageWrapper;
