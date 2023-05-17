import React, { useEffect, useRef, useState } from "react";
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
import { getTimeAgo, getTimeAgoShort } from "~/lib";
import StyledTippy from "~/components/StyledTippy";
import { TippyProps } from "@tippyjs/react";
import { useClickOutside } from "~/hooks";
import OptionsIcon from "~/assets/options.svg";
import deepExtend from "deep-extend";
import { getStyles } from "./styles";

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
  labels: InboxProps["labels"];
  messageId?: IInboxMessagePreview["messageId"];
  read?: IInboxMessagePreview["read"];
  setAreActionsHovered: (hovered: boolean) => void;
  trackingIds?: IInboxMessagePreview["trackingIds"];
  isMobile?: boolean;
}> = ({
  created,
  formatDate,
  hasBody,
  isMessageActive,
  labels,
  messageId,
  read,
  setAreActionsHovered,
  isMobile = false,
}) => {
  const buttonRef = useRef(null);
  const actionsHoverRef = useRef(null);
  const areActionsHovered = useHover(actionsHoverRef);

  const [visible, setVisible] = useState(false);

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

  const formattedTime = formatDate
    ? formatDate(created)
    : getTimeAgoShort(created);

  const readableTimeAgo = formatDate ? formattedTime : getTimeAgo(created);

  const tippyProps: TippyProps = {
    visible: visible,
    placement: "left",
    interactive: true,
    theme: {
      tooltip: {
        ".tippy-content": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F2F6F9",
          border: "1px solid #E5E5E5",
          "> div": {
            width: "100%",
          },
        },
      },
    },
  };

  const handleClickOutside = () => {
    setVisible(false);
  };

  useClickOutside(buttonRef, handleClickOutside);

  const StyledButton = styled.button(({ theme }) => {
    return deepExtend(
      {},
      getStyles(theme),
      {
        width: "100%",
        fontWeight: "bold",
        color: theme.brand.colors?.primary ?? "black",
        margin: "0px",
      },
      theme.action
    );
  });

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
          title={created}
          aria-label={`created ${readableTimeAgo}`}
          style={{ textAlign: "right" }}
        >
          {formattedTime}
        </TimeAgo>

        {isMobile ? (
          <div ref={buttonRef}>
            <StyledTippy
              {...tippyProps}
              content={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <StyledButton
                    onClick={handleEvent(!read ? "read" : "unread")}
                  >
                    {!read ? "Mark Read" : "Unread"}
                  </StyledButton>
                  <StyledButton onClick={handleEvent("archive")}>
                    Archive
                  </StyledButton>
                </div>
              }
            >
              <button
                style={{
                  width: "5px",
                  backgroundColor: "transparent",
                  border: "none",
                  marginRight: "5px",
                }}
                onClick={() => setVisible(!visible)}
              >
                <OptionsIcon />
              </button>
            </StyledTippy>
          </div>
        ) : (
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
        )}
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
