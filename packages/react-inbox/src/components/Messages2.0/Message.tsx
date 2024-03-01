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

import { SlotIcon } from "./pins";

const UnreadIndicator = styled.div<{
  read?: IInboxMessagePreview["read"];
  archived?: IInboxMessagePreview["archived"];
}>(({ theme, read, archived }) => {
  const primaryColor = theme.brand?.colors?.primary;
  return deepExtend(
    {
      visibility: read || archived ? "hidden" : "visible",
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

const ClickableContainer = styled.a(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary ?? "#9121c2";
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
  return deepExtend(
    {
      transition: "background 200ms ease-in-out",
      display: "flex",
      position: "relative",
      padding: "12px",
      minHeight: 60,
      borderBottom: "1px solid",
      borderColor: "var(--ci-structure)",
      "&.read": {
        ".icon": {
          filter: "grayscale(100%)",
          opacity: "0.3",
        },
      },
      "&.archived": {
        filter: "grayscale(100%)",
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

const Pinned = styled.div<{ color?: string }>(({ theme, color }) =>
  deepExtend(
    {
      fontSize: "12px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      color: color ?? "rgb(115, 129, 155)",
      svg: {
        paddingRight: "3px",
      },

      img: {
        width: "18px",
        paddingRight: "3px",
      },
    },
    theme?.message?.pinned
  )
);

const Message: React.FunctionComponent<{
  actions?: IInboxMessagePreview["actions"];
  archived?: IInboxMessagePreview["archived"];
  areActionsHovered?: boolean;
  isMessageActive?: boolean;
  messageId: string;
  openLinksInNewTab?: boolean;
  pinned?: {
    slotId?: string;
  };
  preview?: string;
  read?: IInboxMessagePreview["read"];
  renderedIcon: ReactNode;
  renderActionsAsButtons?: boolean;
  renderPin?: InboxProps["renderPin"];
  title?: string;
}> = ({
  actions,
  archived,
  areActionsHovered,
  isMessageActive,
  messageId,
  openLinksInNewTab,
  pinned,
  preview,
  read,
  renderedIcon,
  renderActionsAsButtons,
  renderPin,
  title,
}) => {
  const courier = useCourier();
  const renderActionButtons =
    renderActionsAsButtons || (actions?.length ?? 0) > 1;
  const { brand, markMessageRead, trackClick } = useInbox();

  const pinDetails = pinned?.slotId
    ? brand?.inapp?.slots?.find((s) => s.id === pinned?.slotId) ??
      brand?.inapp?.slots?.find((s) => s.id === "default")
    : undefined;
  const isPinned = Boolean(pinned?.slotId);

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
        pinned: isPinned,
        read,
        archived,
      })}
    >
      <UnreadIndicator read={read} archived={archived} />
      {renderedIcon}
      <Contents hasIcon={Boolean(renderedIcon)}>
        {pinDetails &&
          (renderPin ? (
            renderPin(pinDetails)
          ) : (
            <Pinned
              color={pinDetails?.label?.color}
              className={pinned?.slotId ?? ""}
            >
              <SlotIcon
                icon={pinDetails?.icon?.value ?? "default"}
                color={pinDetails?.icon?.color}
              />
              {pinDetails?.label?.value ?? "Pinned"}
            </Pinned>
          ))}
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
                key={`${action.href}-${index}`}
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
    defaultIcon: InboxProps["defaultIcon"];
    formatDate: InboxProps["formatDate"];
    isMessageFocused: boolean;
    isMobile?: boolean;
    labels: InboxProps["labels"];
    openLinksInNewTab: InboxProps["openLinksInNewTab"];
    renderActionsAsButtons?: boolean;
    renderPin: InboxProps["renderPin"];
    setFocusedMessageId: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({
  actions,
  archived,
  created,
  data,
  defaultIcon,
  formatDate,
  icon,
  isMessageFocused,
  isMobile,
  labels,
  messageId,
  opened,
  openLinksInNewTab,
  pinned,
  preview,
  read,
  renderActionsAsButtons,
  renderPin,
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

    if (renderActionsAsButtons || !actions?.length || actions.length > 1) {
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
        archived={archived}
        areActionsHovered={areActionsHovered}
        isMessageActive={isMessageFocused || isMessageHovered}
        messageId={messageId}
        openLinksInNewTab={openLinksInNewTab}
        pinned={pinned}
        preview={preview}
        read={read}
        renderActionsAsButtons={renderActionsAsButtons}
        renderedIcon={renderedIcon}
        renderPin={renderPin}
        title={title}
      />
    );
  }, [
    actions,
    archived,
    areActionsHovered,
    isMessageFocused,
    isMessageHovered,
    messageId,
    openLinksInNewTab,
    pinned,
    preview,
    read,
    renderActionsAsButtons,
    renderedIcon,
    renderPin,
    title,
  ]);

  return (
    <PositionRelative
      ref={messageRef}
      data-testid="inbox-message"
      className={classNames({ pinned: Boolean(pinned?.slotId) })}
    >
      {courier.onRouteChange || containerProps.href ? (
        <ClickableContainer {...containerProps}>
          {renderedMessage}
        </ClickableContainer>
      ) : (
        <div tabIndex={0}>{renderedMessage}</div>
      )}
      <MessageActions
        archived={archived}
        created={created}
        formatDate={formatDate}
        isMessageActive={isMessageFocused || isMessageHovered}
        isMobile={isMobile}
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
