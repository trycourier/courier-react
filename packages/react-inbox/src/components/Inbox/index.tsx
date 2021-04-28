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

  const { clientKey, userId, brand } = courierContext;
  const {
    config,
    currentTab,
    fetchMessages,
    getUnreadMessageCount,
    init,
    isOpen,
    messages,
    toggleInbox,
    unreadMessageCount,
  } = useInbox();

  const tippyProps: TippyProps = {
    visible: isOpen,
    placement: props.placement ?? "right",
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
          init({ messages, unreadMessageCount, config: props });
        } catch (ex) {
          console.log("error", ex);
        }
      } else {
        init({
          config: props,
        });
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
  }, [clientKey, userId, messages, config, unreadMessageCount]);

  const handleIconOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleInbox();
  };

  const handleBellOnMouseEnter = (event: React.MouseEvent) => {
    event.preventDefault();
    fetchMessages(currentTab?.filter);
  };

  const handleClickOutside = useCallback(() => {
    if (!isOpen) {
      return;
    }

    toggleInbox(false);
  }, [isOpen]);

  useClickOutside(ref, handleClickOutside);

  if (!courierContext?.inbox) {
    return null;
  }

  return (
    <ThemeProvider
      theme={{
        ...props.theme,
        brand: props.brand ?? brand,
      }}
    >
      <TippyStyle />
      <StyledTippy {...tippyProps} content={<Messages ref={ref} {...props} />}>
        <span
          tabIndex={0}
          role="button"
          aria-pressed="false"
          onClick={handleIconOnClick}
        >
          {props.renderIcon ? (
            <span>
              {props.renderIcon({
                unreadMessageCount,
              })}
            </span>
          ) : (
            <Bell
              className={props.className}
              hasUnreadMessages={Boolean(unreadMessageCount)}
              onMouseEnter={handleBellOnMouseEnter}
            />
          )}
        </span>
      </StyledTippy>
    </ThemeProvider>
  );
};

export default Inbox;
