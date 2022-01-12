import { TippyProps } from "@tippyjs/react";
import { useCourier } from "@trycourier/react-provider";
import deepExtend from "deep-extend";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";

import {
  useInbox,
  useClickOutside,
  useWindowSize,
  useEventListener,
} from "~/hooks";
import BellSvg, { Bell } from "./Bell";
import LazyTippy from "./LazyTippy";
import Messages from "../Messages";
import TippyGlobalStyle from "./TippyGlobalStyle";

import { DEFAULT_TABS } from "~/constants";
import { InboxProps } from "../../types";

const UnreadIndicator = styled.div(({ theme }) =>
  deepExtend(
    {
      position: "absolute",
      top: -2,
      right: 0,
      borderRadius: "100%",
      padding: 5,
      background: theme?.brand?.colors?.primary ?? "#de5063",
      animation: "badge-pulse 10s infinite",
    },
    theme.unreadIndicator
  )
);

const StyledTippy = styled(LazyTippy)<{
  placement?: TippyProps["placement"];
}>(({ theme, placement }) => {
  return deepExtend(
    {
      fontFamily: `'Nunito Sans', sans-serif`,
      boxShadow: "0px 12px 32px rgba(86, 43, 85, 0.3)",
      width: "483px",
      maxWidth: "initial !important",

      borderRadius: theme?.brand?.inapp?.borderRadius ?? "24px",
      outline: "none",
      overflow: "hidden",
      margin: ["left", "right"].includes(String(placement))
        ? "24px 0"
        : "0 24px",

      ".tippy-content": {
        padding: 0,
        display: "flex",
        flexDirection: "column",
        "&, *": {
          boxSizing: "border-box",
        },
      },
    },
    theme.root
  );
});

const Inbox: React.FunctionComponent<InboxProps> = (props) => {
  const ref = useRef(null);
  const courierContext = useCourier();

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const windowSize = useWindowSize();
  const { clientKey, userId } = courierContext;
  const {
    brand,
    currentTab,
    fetchMessages,
    getUnreadMessageCount,
    init,
    isOpen,
    messages,
    setCurrentTab,
    setView,
    toggleInbox,
    unreadMessageCount,
  } = useInbox();

  const tippyProps: TippyProps = {
    visible: props.isOpen ?? isOpen,
    placement: props.placement ?? brand?.inapp?.placement ?? "right",
    interactive: true,
  };

  useEffect(() => {
    if (!userId || !clientKey) {
      return;
    }

    getUnreadMessageCount();
  }, [userId, clientKey]);

  useEffect(() => {
    let didInit = false;
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
          didInit = true;
        } catch (ex) {
          console.log("error", ex);
        }
      }
    }

    if (!didInit) {
      init(props);
    }
  }, [props, clientKey, userId]);

  useEffect(() => {
    if (!clientKey || !userId) {
      return;
    }

    localStorage.setItem(
      `${clientKey}/${userId}/inbox`,
      JSON.stringify({
        messages,
        unreadMessageCount: unreadMessageCount,
      })
    );
  }, [clientKey, userId, messages, unreadMessageCount]);

  const handleIconOnClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (!isOpen) {
        setView("messages");
        setCurrentTab(DEFAULT_TABS[0]);
      }

      toggleInbox();
    },
    [isOpen, setView, setCurrentTab]
  );

  const handleBellOnMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (isOpen) {
        return;
      }

      fetchMessages(currentTab?.filters);
    },
    [isOpen, fetchMessages]
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

  useEventListener("keydown", (event: KeyboardEvent) => {
    if (event?.key === "Escape" && isOpen) {
      toggleInbox(false);
    }
  });

  const bell = useMemo(() => {
    return (
      <Bell
        aria-pressed="false"
        className={`inbox-bell ${props.className ?? ""}`}
        isOpen={isOpen ?? false}
        onClick={handleIconOnClick}
        onMouseEnter={handleBellOnMouseEnter}
        role="button"
        tabIndex={0}
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
          <BellSvg />
        )}
        {unreadMessageCount > 0 && (
          <UnreadIndicator data-testid="unread-badge" />
        )}
      </Bell>
    );
  }, [props, brand, isOpen, handleIconOnClick, handleBellOnMouseEnter]);

  useClickOutside(ref, handleClickOutside);

  if (!courierContext?.inbox) {
    return null;
  }

  const isMobile = windowSize?.width ? windowSize?.width <= 480 : false;

  return (
    <>
      <TippyGlobalStyle />
      <ThemeProvider
        theme={{
          ...props.theme,
          brand,
        }}
      >
        {tippyProps.visible ? (
          <>
            {isMobile ? (
              <Messages ref={ref} isMobile={true} {...props} />
            ) : (
              <StyledTippy
                {...tippyProps}
                content={<Messages ref={ref} {...props} />}
              >
                {bell}
              </StyledTippy>
            )}
          </>
        ) : (
          bell
        )}
      </ThemeProvider>
    </>
  );
};

export default Inbox;
