import React, { ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import { IInboxMessagePreview } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import { TextElement, getIcon, Title } from "./styled";
import { InboxProps } from "../../types";

import { getTimeAgoShort } from "~/lib";
import useHover from "~/hooks/use-hover";
import Markdown from "markdown-to-jsx";

import deepExtend from "deep-extend";
import styled from "styled-components";
import tinycolor2 from "tinycolor2";
import MessageActions from "./actions";
import { useOnScreen } from "~/hooks/use-on-screen";

const ClickableContainer = styled.a(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return deepExtend(
    {
      "*, &": {
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

const UnreadIndicator = styled.div<{ read?: IInboxMessagePreview["read"] }>(
  ({ theme, read }) => {
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
  }
);

const MessageContainer = styled.div(({ theme }) => {
  return deepExtend(
    {
      transition: "background 200ms ease-in-out",
      display: "flex",
      position: "relative",
      padding: "12px",
      minHeight: 60,
      backgroundColor: "#F9FAFB",
      borderBottom: "1px solid rgb(222, 232, 240)",
      "&.read": {
        background: "#F2F6F9",
        ".icon": {
          filter: "grayscale(100%)",
          opacity: "0.3",
        },
      },
    },
    theme?.message?.container
  );
});

const Message: React.FunctionComponent<{
  areActionsHovered?: boolean;
  isMessageHovered?: boolean;
  read?: IInboxMessagePreview["read"];
  renderedIcon: ReactNode;
  preview?: string;
  title?: string;
}> = ({
  areActionsHovered,
  isMessageHovered,
  read,
  renderedIcon,
  preview,
  title,
}) => {
  return (
    <MessageContainer
      className={classNames("message-container", {
        hover: isMessageHovered && !areActionsHovered,
        read,
      })}
    >
      <UnreadIndicator read={read} />
      {renderedIcon}
      <Contents>
        <Title read={read}>{title}</Title>
        <TextElement>
          {preview ? <Markdown>{preview}</Markdown> : null}
        </TextElement>
      </Contents>
    </MessageContainer>
  );
};

const MessageWrapper: React.FunctionComponent<
  IInboxMessagePreview & {
    labels: InboxProps["labels"];
    formatDate: InboxProps["formatDate"];
    defaultIcon: InboxProps["defaultIcon"];
    openLinksInNewTab: InboxProps["openLinksInNewTab"];
  }
> = ({
  actions,
  created,
  data,
  opened,
  defaultIcon,
  formatDate,
  icon,
  labels,
  messageId,
  openLinksInNewTab,
  read,
  preview,
  title,
  trackingIds,
}) => {
  const [messageHoverRef, isMessageHovered] = useHover();
  const [areActionsHovered, setAreActionsHovered] = useState(false);
  const { brand, markMessageRead, markMessageOpened } = useInbox();

  const handleClickMessage = (event?: React.MouseEvent) => {
    event?.preventDefault();
    if (!messageId) {
      return;
    }

    if (!read && trackingIds?.clickTrackingId && trackingIds?.readTrackingId) {
      // mark message read, but don't fire the event as the backend will do it for us,
      // we just want to set the message as read here in our local state
      markMessageRead(messageId);
    }
  };

  useOnScreen(messageHoverRef, () => {
    if (opened || !messageId) {
      return;
    }

    markMessageOpened(messageId);
  });

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

  const clickAction = useMemo(() => {
    if (data?.clickAction) {
      return data.clickAction;
    }

    if (!actions?.length) {
      return;
    }

    return actions[0].href;
  }, [data?.clickAction, actions]);

  let containerProps: {
    href?: string;
    onMouseDown?: (event: React.MouseEvent) => void;
    rel?: string;
    target?: string;
  } = {};

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
        areActionsHovered={areActionsHovered}
        isMessageHovered={isMessageHovered}
        read={read}
        renderedIcon={renderedIcon}
        preview={preview}
        title={title}
      />
    );
  }, [
    areActionsHovered,
    formattedTime,
    isMessageHovered,
    read,
    renderedIcon,
    title,
    preview,
  ]);

  return (
    <div
      ref={messageHoverRef}
      data-testid="inbox-message"
      style={{
        position: "relative",
      }}
    >
      {containerProps.href ? (
        <ClickableContainer {...containerProps}>
          {renderedMessage}
        </ClickableContainer>
      ) : (
        renderedMessage
      )}
      <MessageActions
        formattedTime={formattedTime}
        isMessageHovered={isMessageHovered}
        labels={labels}
        messageId={messageId}
        read={read}
        setAreActionsHovered={setAreActionsHovered}
        trackingIds={trackingIds}
      />
    </div>
  );
};

export default MessageWrapper;
