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

const UnreadIndicator = styled.div<{ showUnreadMessageCount?: boolean }>(
  ({ theme, showUnreadMessageCount }) =>
    deepExtend(
      {
        color: "white",
        fontSize: 11,
        position: "absolute",
        background: theme?.brand?.colors?.primary ?? "#de5063",
        animation: "badge-pulse 10s infinite",
      },
      showUnreadMessageCount
        ? {
            top: -4,
            borderRadius: 17,
            padding: "0 4px",
            height: 16,
            left: 12,
            textAlign: "center",
            minWidth: 8,
          }
        : {
            top: -2,
            right: 0,
            borderRadius: "100%",
            padding: 5,
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

  // set defaults
  props = useMemo(() => {
    return {
      openLinksInNewTab: true,
      tabs: DEFAULT_TABS,
      ...props,
    };
  }, [props]);

  const tabs = props.tabs == false ? undefined : props.tabs;

  const windowSize = useWindowSize();
  const { clientKey, userId } = courierContext;
  const {
    brand,
    getUnreadMessageCount,
    init,
    isOpen: isOpenState,
    messages,
    setCurrentTab,
    setView,
    toggleInbox,
    unreadMessageCount = 0,
  } = useInbox();

  const isOpen = props.isOpen ?? isOpenState;

  const tippyProps: TippyProps = {
    visible: isOpen,
    placement: props.placement ?? brand?.inapp?.placement ?? "right",
    interactive: true,
  };

  useEffect(() => {
    if (!userId || !clientKey) {
      return;
    }

    getUnreadMessageCount();
  }, [userId, clientKey, props.from]);

  useEffect(() => {
    let didInit = false;
    if (clientKey && userId) {
      const localStorageState = localStorage.getItem(
        `${clientKey}/${userId}/inbox`
      );

      if (localStorageState) {
        try {
          const { messages, unreadMessageCount } =
            JSON.parse(localStorageState);
          init({
            brand: props.brand,
            currentTab: props.tabs?.[0],
            isOpen: props.isOpen,
            messages,
            tabs,
            unreadMessageCount,
          });
          didInit = true;
        } catch (ex) {
          console.log("error", ex);
        }
      }
    }

    if (!didInit) {
      init({
        brand: props.brand,
        isOpen: props.isOpen,
        tabs,
        currentTab: props.tabs?.[0],
      });
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
        setCurrentTab(tabs?.[0] ?? DEFAULT_TABS[1]);
      }

      toggleInbox();
    },
    [isOpen, setView, setCurrentTab]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (!isOpen || event.target.closest(".inbox-bell")) {
        return;
      }

      // prop is overriding our state
      if (props.isOpen) {
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
          <UnreadIndicator
            showUnreadMessageCount={props.showUnreadMessageCount}
            data-testid="unread-badge"
          >
            {props.showUnreadMessageCount
              ? unreadMessageCount > 99
                ? "99+"
                : unreadMessageCount
              : undefined}
          </UnreadIndicator>
        )}
      </Bell>
    );
  }, [props, brand, isOpen, handleIconOnClick]);

  useClickOutside(ref, handleClickOutside);

  if (!courierContext?.inbox) {
    return null;
  }

  const isMobile = windowSize?.width ? windowSize?.width <= 480 : false;

  const BellWrapper = () => {
    return props.renderBell
      ? props.renderBell({
          className: `inbox-bell ${props.className ?? ""}`,
          isOpen: isOpen ?? false,
          onClick: handleIconOnClick,
        }) ?? bell
      : bell;
  };

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
                {BellWrapper()}
              </StyledTippy>
            )}
          </>
        ) : (
          BellWrapper()
        )}
      </ThemeProvider>
    </>
  );
};

export default Inbox;
