import React, { useEffect } from "react";
import classNames from "classnames";

import { useInbox } from "@trycourier/react-hooks";

import { TimeAgo } from "~/components/Message/styled";
import useHover from "~/hooks/use-hover";

import { IMessageProps } from "../Message";
import CloseAction from "./Close";
import MarkRead, { Checkmark } from "./MarkRead";
import MarkUnread from "./MarkUnread";
import styled from "styled-components";
import { InboxProps } from "~/types";

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
  isMessageHovered?: boolean;
  labels: InboxProps["labels"];
  messageId?: string;
  read?: boolean;
  setAreActionsHovered: (hovered: boolean) => void;
  trackingIds?: IMessageProps["trackingIds"];
}> = ({
  formattedTime,
  hasBody,
  isMessageHovered,
  labels,
  messageId,
  read,
  setAreActionsHovered,
}) => {
  const [actionsHoverRef, areActionsHovered] = useHover();

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
          visible: isMessageHovered,
        })}
      >
        {!read && <MarkRead onClick={handleEvent("read")} />}
        {read && <MarkUnread onClick={handleEvent("unread")} />}
        <CloseAction
          size="small"
          title="archive message"
          onClick={handleEvent("archive")}
          tooltip="Archive Message"
        />
      </div>
      <div
        className={classNames({
          visible: !isMessageHovered,
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
