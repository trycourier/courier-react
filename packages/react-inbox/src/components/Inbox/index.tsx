import React, { useEffect, useRef, useCallback } from "react";
import { TippyProps } from "@tippyjs/react";
import TippyStyle from "./TippyStyle";
import styled, { ThemeProvider } from "styled-components";
import deepExtend from "deep-extend";
import Messages from "../Messages";
import BellSvg, { Bell } from "./Bell";
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
      background: theme?.brand?.colors?.tertiary ?? "#de5063",
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
      background: "#FFFFFF !important",
      backgroundColor: "#FFFFFF !important",
      boxShadow: "0px 12px 32px rgba(86, 43, 85, 0.3)",
      minWidth: 483,
      maxHeight: 545,

      borderRadius: theme?.brand?.inapp?.borderRadius ?? "24px",
      outline: "none",
      overflow: "hidden",
      margin: ["left", "right"].includes(String(placement))
        ? "24px 0"
        : "0 24px",

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
    <>
      <TippyStyle />
      <ThemeProvider
        theme={{
          ...props.theme,
          brand,
        }}
      >
        <StyledTippy
          {...tippyProps}
          content={<Messages ref={ref} {...props} />}
        >
          <Bell
            isOpen={isOpen}
            aria-pressed="false"
            className={`inbox-bell ${props.className ?? ""}`}
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
        </StyledTippy>
      </ThemeProvider>
    </>
  );
};

export default Inbox;
