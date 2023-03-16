import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useCourier, IInboxMessagePreview } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import { TextElement, getIcon, Title } from "./styled";
import { InboxProps } from "../../types";

import { getTimeAgoShort, getTimeAgo } from "~/lib";
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
      cursor: "pointer",
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
  isMessageActive?: boolean;
  read?: IInboxMessagePreview["read"];
  renderedIcon: ReactNode;
  preview?: string;
  title?: string;
}> = ({
  areActionsHovered,
  isMessageActive,
  read,
  renderedIcon,
  preview,
  title,
}) => {
  return (
    <MessageContainer
      className={classNames("message-container", {
        hover: isMessageActive && !areActionsHovered,
        read,
      })}
    >
      <UnreadIndicator read={read} />
      {renderedIcon}
      <Contents>
        <Title aria-label={`message title ${title}`} read={read}>
          {title}
        </Title>
        <TextElement aria-label={`message body ${preview}`}>
          {preview ? <Markdown>{preview}</Markdown> : null}
        </TextElement>
      </Contents>
    </MessageContainer>
  );
};

const MessageWrapper: React.FunctionComponent<
  IInboxMessagePreview & {
    isMessageFocused: boolean;
    setFocusedMessageId: React.Dispatch<React.SetStateAction<string>>;
    labels: InboxProps["labels"];
    formatDate: InboxProps["formatDate"];
    defaultIcon: InboxProps["defaultIcon"];
    openLinksInNewTab: InboxProps["openLinksInNewTab"];
  }
> = ({
  actions,
  created,
  data,
  defaultIcon,
  formatDate,
  icon,
  isMessageFocused,
  labels,
  messageId,
  opened,
  openLinksInNewTab,
  preview,
  read,
  setFocusedMessageId,
  title,
  trackingIds,
}) => {
  const courier = useCourier();
  const [activeTimeout, setActiveTimeout] = useState<NodeJS.Timeout>();
  const messageRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [areActionsHovered, setAreActionsHovered] = useState(false);
  const { brand, markMessageRead, markMessageOpened } = useInbox();

  const isMessageHovered = useHover(messageRef);

  useEffect(() => {
    const handleFocus = () => {
      setFocusedMessageId(messageId);
    };

    const node = messageRef?.current;

    if (node) {
      node.addEventListener("focusin", handleFocus);
      return () => {
        node.removeEventListener("focusin", handleFocus);
      };
    }
  }, [messageRef?.current]);

  const isVisible = useOnScreen(messageRef, {
    root: document.querySelector("#inbox-message-list"),
    threshold: 0.6,
  });

  useEffect(
    function handleMessageVisibility() {
      if (opened || !messageId) {
        return;
      }

      if (activeTimeout) {
        if (isVisible) {
          return;
        }

        clearTimeout(activeTimeout);
        setActiveTimeout(undefined);
        return;
      }

      if (!isVisible) {
        return;
      }

      const THROTTLE_TIMEOUT = 1000;
      const newTimeout = setTimeout(() => {
        markMessageOpened(messageId);
      }, THROTTLE_TIMEOUT);

      setActiveTimeout(newTimeout);
    },
    [opened, messageId, isVisible, activeTimeout]
  );

  useEffect(
    function handleMessageUnmount() {
      return () => {
        if (!activeTimeout) {
          return;
        }

        clearTimeout(activeTimeout);
      };
    },
    [activeTimeout]
  );

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

  const readableTimeAgo = formatDate ? formattedTime : getTimeAgo(created);

  const clickAction = useMemo(() => {
    if (data?.clickAction) {
      return data.clickAction;
    }

    if (!actions?.length) {
      return;
    }

    return actions[0].href;
  }, [data?.clickAction, actions]);

  const handleClickMessage = (event?: React.MouseEvent) => {
    event?.preventDefault();

    if (!messageId) {
      return;
    }

    if (!read) {
      markMessageRead(messageId);
    }

    if (clickAction && courier.onRouteChange) {
      courier.onRouteChange(clickAction);
    }
  };

  let containerProps: {
    href?: string;
    onMouseDown?: (event: React.MouseEvent) => void;
    rel?: string;
    target?: string;
    tabIndex: number;
  } = {
    tabIndex: 0,
  };

  if (clickAction) {
    if (!courier.onRouteChange) {
      containerProps.href = clickAction;

      if (openLinksInNewTab) {
        containerProps = {
          ...containerProps,
          target: "_blank",
          rel: "noreferrer",
        };
      }
    }

    containerProps.onMouseDown = handleClickMessage;
  }

  const renderedMessage = useMemo(() => {
    return (
      <Message
        areActionsHovered={areActionsHovered}
        isMessageActive={isMessageFocused || isMessageHovered}
        read={read}
        renderedIcon={renderedIcon}
        preview={preview}
        title={title}
      />
    );
  }, [
    areActionsHovered,
    isMessageFocused,
    isMessageHovered,
    read,
    renderedIcon,
    title,
    preview,
  ]);

  return (
    <div
      ref={messageRef}
      data-testid="inbox-message"
      style={{
        position: "relative",
      }}
    >
      {courier.onRouteChange || containerProps.href ? (
        <ClickableContainer {...containerProps}>
          {renderedMessage}
        </ClickableContainer>
      ) : (
        <div tabIndex={0}>{renderedMessage}</div>
      )}
      <MessageActions
        readableTimeAgo={readableTimeAgo}
        formattedTime={formattedTime}
        isMessageActive={isMessageFocused || isMessageHovered}
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
