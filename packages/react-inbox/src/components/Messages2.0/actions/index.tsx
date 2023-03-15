import React, { useEffect, useRef } from "react";
import classNames from "classnames";

import { useInbox } from "@trycourier/react-hooks";

import { TimeAgo } from "~/components/Messages2.0/styled";
import useHover from "~/hooks/use-hover";

import CloseAction from "./Close";
import MarkRead, { Checkmark } from "./MarkRead";
import MarkUnread from "./MarkUnread";
import styled from "styled-components";
import { InboxProps } from "~/types";
import { IInboxMessagePreview } from "@trycourier/react-provider";

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
  formattedTime: string;
  hasBody?: boolean;
  isMessageActive?: boolean;
  labels: InboxProps["labels"];
  messageId?: IInboxMessagePreview["messageId"];
  read?: IInboxMessagePreview["read"];
  readableTimeAgo: string;
  setAreActionsHovered: (hovered: boolean) => void;
  trackingIds?: IInboxMessagePreview["trackingIds"];
}> = ({
  formattedTime,
  hasBody,
  isMessageActive,
  labels,
  messageId,
  read,
  readableTimeAgo,
  setAreActionsHovered,
}) => {
  const actionsHoverRef = useRef(null);
  const areActionsHovered = useHover(actionsHoverRef);

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
  };

  return (
    <Styled
      ref={actionsHoverRef}
      className={classNames({
        hasBody,
      })}
    >
      <div
        className={classNames({
          hidden: !isMessageActive,
        })}
      >
        <TimeAgo
          tabIndex={0}
          aria-label={`created ${readableTimeAgo}`}
          style={{ textAlign: "right" }}
        >
          {formattedTime}
        </TimeAgo>

        <div className="message-actions">
          {!read && (
            <MarkRead
              label={labels?.markAsRead}
              onClick={handleEvent("read")}
            />
          )}
          {read && (
            <MarkUnread
              label={labels?.markAsUnread}
              onClick={handleEvent("unread")}
            />
          )}
          <CloseAction
            size="small"
            title={labels?.archiveMessage ?? "archive message"}
            onClick={handleEvent("archive")}
            tooltip={labels?.archiveMessage ?? "Archive Message"}
          />
        </div>
      </div>
      <div
        className={classNames({
          hidden: isMessageActive,
        })}
      >
        <TimeAgo>{formattedTime}</TimeAgo>
        {read && (
          <Checkmark
            fill={"rgba(86, 96, 116, 0.3)"}
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
