import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useCourier, IInboxMessagePreview } from "@trycourier/react-provider";
import { useInbox } from "@trycourier/react-hooks";

import {
  TextElement,
  ActionElement,
  getIcon,
  Title,
  PositionRelative,
} from "./styled";
import { InboxProps } from "../../types";

import useHover from "~/hooks/use-hover";
import Markdown from "markdown-to-jsx";

import deepExtend from "deep-extend";
import styled from "styled-components";
import tinycolor2 from "tinycolor2";
import MessageActions from "./actions";
import { useOnScreen } from "~/hooks/use-on-screen";
import Thumbtack from "~/assets/thumbtack.svg";

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
    theme?.message?.container,
    theme?.message?.clickableContainer
  );
});

const MessageContainer = styled.div(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return deepExtend(
    {
      transition: "background 200ms ease-in-out",
      display: "flex",
      position: "relative",
      padding: "12px",
      minHeight: 60,
      borderBottom: "1px solid rgb(222, 232, 240)",
      "&.pinned": {
        background: tcPrimaryColor.setAlpha(0.45),
      },
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

const Contents = styled.div<{ hasIcon: boolean }>(({ theme, hasIcon }) => ({
  marginRight: "auto",
  textAlign: "left",
  marginLeft: hasIcon ? 12 : 0,
  ...theme.message?.contents,
}));

const Pinned = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;
  color: rgb(115, 129, 155);
  svg {
    padding-right: 3px;
  }
`;

const Message: React.FunctionComponent<{
  actions?: IInboxMessagePreview["actions"];
  areActionsHovered?: boolean;
  isMessageActive?: boolean;
  messageId: string;
  openLinksInNewTab?: boolean;
  pinned?: boolean;
  preview?: string;
  read?: IInboxMessagePreview["read"];
  renderedIcon: ReactNode;
  title?: string;
}> = ({
  actions,
  areActionsHovered,
  isMessageActive,
  messageId,
  openLinksInNewTab,
  pinned,
  preview,
  read,
  renderedIcon,
  title,
}) => {
  const courier = useCourier();
  const renderActionButtons = (actions?.length ?? 0) > 1;
  const { markMessageRead, trackClick } = useInbox();

  const handleActionClick = (action) => async (event) => {
    event.preventDefault();

    const promises = [
      !read && markMessageRead(messageId),
      action?.data?.trackingId &&
        trackClick(messageId, action?.data?.trackingId),
    ].filter(Boolean);

    if (promises.length) {
      await Promise.all(promises);
    }

    if (courier.onRouteChange) {
      courier.onRouteChange(action?.href);
      return;
    }

    if (openLinksInNewTab) {
      window.open(action?.href, "_blank");
    } else {
      window.location.href = action?.href;
    }
  };

  return (
    <MessageContainer
      className={classNames("message-container", {
        hover: isMessageActive && !areActionsHovered,
        pinned,
        read,
      })}
    >
      <UnreadIndicator read={read} />
      {renderedIcon}
      <Contents hasIcon={Boolean(renderedIcon)}>
        {pinned && (
          <Pinned>
            <Thumbtack />
            <em>Pinned</em>
          </Pinned>
        )}
        <Title aria-label={`message title ${title}`} read={read}>
          {title}
        </Title>
        <TextElement aria-label={`message body ${preview}`}>
          {preview ? <Markdown>{preview}</Markdown> : null}
        </TextElement>
        {renderActionButtons
          ? actions?.slice(0, 2)?.map((action, index) => (
              <ActionElement
                primary={index === 0}
                backgroundColor={action.background_color}
                key={action.href}
                onClick={handleActionClick(action)}
              >
                {action.content}
              </ActionElement>
            ))
          : undefined}
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
  pinned,
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
  const { brand, markMessageOpened, markMessageRead, trackClick } = useInbox();

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

  const clickActionDetails = useMemo(() => {
    if (data?.clickAction) {
      return {
        href: data.clickAction,
      };
    }

    if (!actions?.length || actions.length > 1) {
      return;
    }

    return {
      trackingId: actions[0].data?.trackingId,
      href: actions[0].href,
    };
  }, [data?.clickAction, actions]);

  let containerProps: {
    href?: string;
    onClick?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    rel?: string;
    target?: string;
    tabIndex: number;
  } = {
    tabIndex: 0,
  };

  if (clickActionDetails?.href) {
    containerProps.href = clickActionDetails?.href;

    if (openLinksInNewTab) {
      containerProps = {
        ...containerProps,
        target: "_blank",
        rel: "noreferrer",
      };
    }

    containerProps.onClick = async (event) => {
      event.preventDefault();

      const promises = [
        !read && markMessageRead(messageId),
        clickActionDetails?.trackingId &&
          trackClick(messageId, clickActionDetails?.trackingId),
      ].filter(Boolean);

      if (promises.length) {
        await Promise.all(promises);
      }

      if (courier.onRouteChange) {
        courier.onRouteChange(clickActionDetails?.href);
        return;
      }

      if (openLinksInNewTab) {
        window.open(clickActionDetails?.href, "_blank");
      } else {
        window.location.href = clickActionDetails?.href;
      }
    };
  }

  const renderedMessage = useMemo(() => {
    return (
      <Message
        actions={actions}
        areActionsHovered={areActionsHovered}
        isMessageActive={isMessageFocused || isMessageHovered}
        messageId={messageId}
        openLinksInNewTab={openLinksInNewTab}
        pinned={pinned}
        preview={preview}
        read={read}
        renderedIcon={renderedIcon}
        title={title}
      />
    );
  }, [
    actions,
    areActionsHovered,
    isMessageFocused,
    isMessageHovered,
    messageId,
    openLinksInNewTab,
    preview,
    read,
    renderedIcon,
    title,
  ]);

  return (
    <PositionRelative
      ref={messageRef}
      data-testid="inbox-message"
      className={classNames({ pinned })}
    >
      {courier.onRouteChange || containerProps.href ? (
        <ClickableContainer {...containerProps}>
          {renderedMessage}
        </ClickableContainer>
      ) : (
        <div tabIndex={0}>{renderedMessage}</div>
      )}
      <MessageActions
        created={created}
        formatDate={formatDate}
        isMessageActive={isMessageFocused || isMessageHovered}
        labels={labels}
        messageId={messageId}
        read={read}
        setAreActionsHovered={setAreActionsHovered}
        trackingIds={trackingIds}
      />
    </PositionRelative>
  );
};

export default MessageWrapper;
