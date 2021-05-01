import React, { useEffect, useRef, useCallback } from "react";
import { TippyProps } from "@tippyjs/react";
import TippyStyle from "./TippyStyle";
import styled, { ThemeProvider } from "styled-components";
import deepExtend from "deep-extend";
import Messages from "../Messages";
import Bell from "./Bell";
import { useCourier, registerReducer } from "@trycourier/react-provider";
import LazyTippy from "./LazyTippy";
import { useInbox, useClickOutside } from "~/hooks";
import { InboxProps } from "../../types";
import reducer from "~/reducer";

const UnreadIndicator = styled.div(({ theme }) =>
  deepExtend(
    {
      position: "absolute",
      top: -2,
      right: 0,
      borderRadius: "100%",
      padding: 5,
      background: theme?.brand?.colors?.secondary ?? "#de5063",
      animation: "badge-pulse 10s infinite",
    },
    theme.unreadIndicator
  )
);

const StyledTippy = styled(LazyTippy)(({ theme }) =>
  deepExtend(
    {
      fontFamily: `"Nunito", sans-serif`,
      background: "#FFFFFF !important",
      backgroundColor: "#FFFFFF !important",
      boxShadow: "0px 12px 32px rgba(86, 43, 85, 0.3)",
      minWidth: 483,
      maxHeight: 545,
      borderRadius: "20px",
      overflow: "hidden",
      outline: "none",

      ".tippy-content": {
        padding: 0,
        maxHeight: 545,
        display: "flex",
        flexDirection: "column",
        "> div": {
          flex: 1,
          maxHeight: 545,
        },
      },

      ".tippy-arrow": {
        color: theme?.brand?.inapp?.invertHeader
          ? theme?.brand?.colors?.primary
          : "#f9fafb",
      },
    },
    theme.root
  )
);

const Inbox: React.FunctionComponent<InboxProps> = (props) => {
  const ref = useRef(null);
  const courierContext = useCourier();

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const { clientKey, userId, brand: remoteBrand } = courierContext;
  const {
    currentTab,
    fetchMessages,
    getUnreadMessageCount,
    init,
    isOpen,
    messages,
    toggleInbox,
    unreadMessageCount,
  } = useInbox();

  const brand = props.brand ?? remoteBrand;

  const tippyProps: TippyProps = {
    visible: isOpen,
    placement: props.placement ?? brand?.inapp?.placement ?? "right",
    interactive: true,
  };

  useEffect(() => {
    registerReducer("inbox", reducer);
  }, []);

  useEffect(() => {
    getUnreadMessageCount();
  }, [userId, clientKey]);

  useEffect(() => {
    if (clientKey && userId) {
      const localStorageState = localStorage.getItem(
        `${clientKey}/${userId}/inbox`
      );

      if (localStorageState) {
        try {
          const { messages, unreadMessageCount } = JSON.parse(
            localStorageState
          );
          init({ messages, unreadMessageCount, ...props });
        } catch (ex) {
          console.log("error", ex);
        }
      } else {
        init(props);
      }
    }
  }, [props, clientKey, userId]);

  useEffect(() => {
    localStorage.setItem(
      `${clientKey}/${userId}/inbox`,
      JSON.stringify({
        messages,
        unreadMessageCount: unreadMessageCount,
      })
    );
  }, [clientKey, userId, messages, unreadMessageCount]);

  const handleIconOnClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    toggleInbox();
  }, []);

  const handleBellOnMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (isOpen) {
        return;
      }

      fetchMessages(currentTab?.filter);
    },
    [isOpen]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (!isOpen || event.target.closest(".inbox-bell")) {
        return;
      }

      toggleInbox(false);
    },
    [isOpen]
  );

  useClickOutside(ref, handleClickOutside);

  if (!courierContext?.inbox) {
    return null;
  }

  return (
    <ThemeProvider
      theme={{
        ...props.theme,
        brand,
      }}
    >
      <TippyStyle />
      <StyledTippy {...tippyProps} content={<Messages ref={ref} {...props} />}>
        <div
          aria-pressed="false"
          className={`inbox-bell ${props.className ?? ""}`}
          onClick={handleIconOnClick}
          onMouseEnter={handleBellOnMouseEnter}
          role="button"
          tabIndex={0}
          style={{
            position: "relative",
            outline: "none",
            display: "inline-block",
          }}
        >
          {props.renderIcon ? (
            <span>
              {props.renderIcon({
                unreadMessageCount,
              })}
            </span>
          ) : brand?.inapp?.icons?.bell ? (
            <img src={brand?.inapp?.icons?.bell} />
          ) : (
            <Bell />
          )}
          {unreadMessageCount > 0 && (
            <UnreadIndicator data-testid="unread-badge" />
          )}
        </div>
      </StyledTippy>
    </ThemeProvider>
  );
};

export default Inbox;
