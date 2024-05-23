import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useClickOutside } from "~/hooks";

import { useInbox } from "@trycourier/react-hooks";

import { TimeAgo } from "~/components/Messages2.0/styled";
import useHover from "~/hooks/use-hover";
import OptionsSvg from "~/assets/options.svg";

import CloseAction from "./Close";
import MarkRead, { Checkmark } from "./MarkRead";
import MarkUnread from "./MarkUnread";
import styled from "styled-components";
import { InboxProps } from "~/types";
import { getTimeAgo, getTimeAgoShort } from "~/lib";
import deepExtend from "deep-extend";
import { IInboxMessagePreview } from "@trycourier/core";

const MobileActionsMenuButton = styled.button(({ theme }) =>
  deepExtend(
    {
      marginTop: "50px",
      padding: "0 12px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      svg: {
        transform: "rotate(90deg)",
      },
    },
    theme?.message?.actionMenu?.button
  )
);

const MobileActions = styled.div(({ theme }) =>
  deepExtend(
    {
      marginTop: "42px",
      width: "150px",
      display: "flex",
      background: "white",
      flexDirection: "column",
      borderRadius: "6px",
      zIndex: 1,
      border: "1px solid #d5d1d1",
      boxShadow: "0px 8px 24px rgba(28,39,58,0.3)",
      button: {
        cursor: "pointer",
        "&:first-child": {
          borderBottom: "1px solid #d5d1d1",
        },
        border: "none",
        width: "100%",
        padding: "10px 0",
        background: "transparent",
      },
    },
    theme?.message?.actionMenu?.dropdown
  )
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Styled = styled.div((_props) => {
  return {
    display: "flex",
    height: 24,
    alignItems: "center",
    position: "absolute",
    right: 12,

    ".close": {
      marginRight: -6,
      marginLeft: 6,
      marginTop: -3,
    },

    "> div": {
      opacity: 0,
      top: 4,
      right: 0,
      position: "absolute",
      visibility: "hidden",
      transition: "opacity 200ms ease-in-out",

      "&:not(.hidden)": {
        opacity: 1,
        visibility: "visible",
        textAlign: "right",
      },
    },

    ".message-actions": {
      display: "flex",
      alignItems: "center",
      marginTop: 2,
    },
    "&.hasBody": {
      top: 12,
    },
    "&:not(.hasBody)": {
      top: 8,
    },
  };
});

const MessageActions: React.FunctionComponent<{
  created: string;
  formatDate?: InboxProps["formatDate"];
  hasBody?: boolean;
  isMessageActive?: boolean;
  isMobile?: boolean;
  labels: InboxProps["labels"];
  messageId?: IInboxMessagePreview["messageId"];
  read?: IInboxMessagePreview["read"];
  archived?: IInboxMessagePreview["archived"];
  setAreActionsHovered: (hovered: boolean) => void;
  trackingIds?: IInboxMessagePreview["trackingIds"];
}> = ({
  created,
  formatDate,
  hasBody,
  isMessageActive,
  isMobile,
  labels,
  messageId,
  read,
  archived,
  setAreActionsHovered,
}) => {
  const actionsHoverRef = useRef(null);
  const mobileActionsRef = useRef(null);
  const areActionsHovered = useHover(actionsHoverRef);
  const [showMobileActions, setShowMobileActions] = useState(false);

  useEffect(() => {
    setAreActionsHovered(areActionsHovered);
  }, [areActionsHovered]);

  const { markMessageArchived, markMessageRead, markMessageUnread } =
    useInbox();

  const handleEvent = (eventName: string) => (event: React.MouseEvent) => {
    event?.preventDefault();
    if (!messageId) {
      return;
    }

    switch (eventName) {
      case "archive": {
        markMessageArchived(messageId);
        break;
      }

      case "read": {
        markMessageRead(messageId);
        break;
      }

      case "unread": {
        markMessageUnread(messageId);
        break;
      }
    }

    setShowMobileActions(false);
  };

  const formattedTime = formatDate
    ? formatDate(archived ? archived : created)
    : getTimeAgoShort(archived ? archived : created);

  const readableTimeAgo = formatDate
    ? formattedTime
    : getTimeAgo(archived ? archived : created);

  const markAsReadLabel = labels?.markAsRead ?? "Mark as Read";
  const markUnreadLabel = labels?.markAsRead ?? "Mark Unread";
  const archiveLabel = labels?.archiveMessage ?? "Archive Message";

  useClickOutside(mobileActionsRef, (event) => {
    const target = event.target as HTMLElement;
    if (target?.closest(`.action-menu[data-message-id="${messageId}"]`)) {
      return;
    }

    setShowMobileActions(false);
  });

  return (
    <Styled
      ref={actionsHoverRef}
      className={classNames({
        hasBody,
      })}
    >
      {!archived && isMobile && (
        <MobileActionsMenuButton
          className="action-menu"
          data-message-id={messageId}
          onClick={() => {
            setShowMobileActions(!showMobileActions);
          }}
        >
          <OptionsSvg />
        </MobileActionsMenuButton>
      )}
      {showMobileActions && (
        <MobileActions ref={mobileActionsRef}>
          {read ? (
            <button onClick={handleEvent("unread")}>{markUnreadLabel}</button>
          ) : (
            <button onClick={handleEvent("read")}>{markAsReadLabel}</button>
          )}
          <button onClick={handleEvent("archive")}>{archiveLabel}</button>
        </MobileActions>
      )}
      <div
        className={classNames({
          hidden: !isMobile && !isMessageActive,
        })}
      >
        <TimeAgo
          tabIndex={0}
          title={created}
          aria-label={`created ${readableTimeAgo}`}
          style={{ textAlign: "right" }}
        >
          {archived ? `Archived: ${formattedTime}` : formattedTime}
        </TimeAgo>
        {!archived && !isMobile && (
          <div className="message-actions">
            {!read && (
              <MarkRead label={markAsReadLabel} onClick={handleEvent("read")} />
            )}
            {read && (
              <MarkUnread
                label={markUnreadLabel}
                onClick={handleEvent("unread")}
              />
            )}
            <CloseAction
              size="small"
              title={archiveLabel}
              onClick={handleEvent("archive")}
              tooltip={archiveLabel}
            />
          </div>
        )}
      </div>
      <div
        className={classNames({
          hidden: isMobile || isMessageActive,
        })}
      >
        <TimeAgo>{formattedTime}</TimeAgo>
        {read && !archived && (
          <Checkmark
            fill="var(--ci-icon)"
            style={{
              marginRight: -6,
              marginLeft: -3,
            }}
          />
        )}
      </div>
    </Styled>
  );
};

export default MessageActions;
