import { TippyProps } from "@tippyjs/react";
import { useCourier } from "@trycourier/react-provider";
import deepExtend from "deep-extend";
import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  KeyboardEventHandler,
} from "react";
import styled, { ThemeProvider } from "styled-components";
import { useInbox } from "@trycourier/react-hooks";

import {
  useClickOutside,
  useWindowSize,
  useEventListener,
  useLocalStorageMessages,
} from "~/hooks";
import BellSvg, { Bell } from "./Bell";
import LazyTippy from "./LazyTippy";
import Messages2 from "../Messages2.0";

import TippyGlobalStyle from "./TippyGlobalStyle";

import { InboxProps } from "../../types";

const UnreadIndicator = styled.div<{ showUnreadMessageCount?: boolean }>(
  ({ theme, showUnreadMessageCount }) =>
    deepExtend(
      {
        color: "white",
        fontSize: 11,
        position: "absolute",
        background: theme?.brand?.colors?.primary ?? "#de5063",
        animation: "inbox--badge-pulse 10s infinite",
      },
      showUnreadMessageCount
        ? {
            top: -4,
            borderRadius: 17,
            padding: "0 4px",
            height: 16,
            left: theme.rtl ? undefined : 12,
            right: theme.rtl ? 12 : undefined,
            textAlign: "center",
            minWidth: 8,
          }
        : {
            top: -2,
            right: theme.rtl ? undefined : 0,
            left: theme.rtl ? 0 : undefined,
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
      boxShadow: "0px 8px 24px rgba(28, 39, 58, 0.3)",
      width: theme.name !== "classic" ? "396px" : "483px",
      maxWidth: "initial !important",

      borderRadius: theme?.brand?.inapp?.borderRadius ?? "12px",
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
    return deepExtend(
      {},
      {
        openLinksInNewTab: true,
        title: "Notifications",
        views: [
          {
            id: "messages",
            label: "Notifications",
          },
        ],
        theme: {
          brand: props.brand ?? {
            colors: {
              primary: "#9121c2",
            },
          },
        },
      },
      props
    );
  }, [props]);

  const windowSize = useWindowSize();
  const {
    brand,
    init,
    isOpen: isOpenState,
    setView,
    toggleInbox,
    unreadMessageCount = 0,
  } = useInbox();

  const isOpen = props.isOpen ?? isOpenState;

  const tippyProps: TippyProps = {
    interactive: true,
    placement: props.placement ?? brand?.inapp?.placement ?? "right",
    visible: isOpen,
  };

  if (props.appendTo) {
    const appendToElem = document.querySelector(props.appendTo);
    if (appendToElem) {
      tippyProps.appendTo = appendToElem;
    }
  }

  const localStorageState = useLocalStorageMessages(
    courierContext.clientKey,
    courierContext.userId
  );

  useEffect(() => {
    init({
      ...localStorageState,
      brand: props.brand,
      isOpen: props.isOpen,
      onEvent: props.onEvent,
    });

    if (!props.brand || Object.entries(props.brand).length === 0) {
      courierContext.getBrand(courierContext.brandId);
    }
  }, [localStorageState, props.brand, props.isOpen, props.onEvent]);

  const handleIconEvent = useCallback(() => {
    const viewId = props?.views?.[0]?.id;
    if (!isOpen && viewId) {
      setView(viewId);
    }

    toggleInbox();
  }, [isOpen, setView]);

  const handleIconOnClick = useCallback(
    (event: React.MouseEvent) => {
      event?.preventDefault();
      handleIconEvent();
    },
    [handleIconEvent]
  );

  const handleIconOnKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.key !== "Enter") {
        return;
      }

      handleIconEvent();
    },
    [handleIconEvent]
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
        aria-pressed={isOpen}
        data-testid="bell"
        className={`inbox-bell ${props.className ?? ""}`}
        isOpen={isOpen ?? false}
        onClick={handleIconOnClick}
        onKeyDown={handleIconOnKeyDown}
        role="button"
        title={props.title ?? "inbox"}
        tabIndex={0}
      >
        {props.renderIcon ? (
          <span>
            {props.renderIcon({
              unreadMessageCount,
              isOpen: isOpen ?? false,
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
  }, [props, brand, isOpen, handleIconOnClick, handleIconOnKeyDown]);

  useClickOutside(ref, handleClickOutside);

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

  if (!courierContext?.inbox) {
    return null;
  }

  return (
    <>
      <TippyGlobalStyle />
      <ThemeProvider
        theme={deepExtend({}, props.theme ?? {}, {
          brand,
        })}
      >
        {tippyProps.visible ? (
          <>
            {isMobile ? (
              <Messages2 ref={ref} isMobile={true} {...props} />
            ) : (
              <StyledTippy
                {...tippyProps}
                className="inbox--tippy-main"
                content={<Messages2 ref={ref} {...props} />}
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
