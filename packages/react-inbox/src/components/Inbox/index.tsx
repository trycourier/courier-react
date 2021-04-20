import React, { useEffect } from "react";
import { TippyProps } from "@tippyjs/react";
import tippyCss from "./tippy.css";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import deepExtend from "deep-extend";
import Messages from "../Messages";
import Bell from "./Bell";
import { useCourier, registerReducer } from "@trycourier/react-provider";
import LazyTippy from "./LazyTippy";
import useInbox from "~/hooks/use-inbox";
import { InboxProps } from "../../types";
import reducer from "~/reducer";

const GlobalStyle = createGlobalStyle`
  ${tippyCss}

  @keyframes badge-pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(222, 80, 99, 0.3);
      box-shadow: 0 0 0 0 rgba(222, 80, 99, 0.3);
    }
    10% {
        -moz-box-shadow: 0 0 0 10px rgba(222, 80, 99, 0);
        box-shadow: 0 0 0 10px rgba(222, 80, 99, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(222, 80, 99, 0);
        box-shadow: 0 0 0 0 rgba(222, 80, 99, 0);
    }
  }
`;

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
        color: "#f9fafb",
      },
    },
    theme.root
  )
);

const Inbox: React.FunctionComponent<InboxProps> = (props) => {
  const courierContext = useCourier();

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const { clientKey, userId, brand } = courierContext;
  const {
    fetchMessages,
    init,
    messages,
    config,
    unreadMessageCount,
    currentTab,
    getUnreadMessageCount,
  } = useInbox();
  const tippyProps: TippyProps = {
    trigger: props.trigger ?? "click",
    placement: props.placement ?? "right",
    interactive: true,
  };

  useEffect(() => {
    registerReducer("inbox", reducer);
    getUnreadMessageCount();
  }, []);

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

  const handleBellOnMouseEnter = (event: React.MouseEvent) => {
    event.preventDefault();
    fetchMessages(currentTab?.filter);
  };

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
      <GlobalStyle />
      <StyledTippy {...tippyProps} content={<Messages {...props} />}>
        {props.renderIcon ? (
          <span>
            {props.renderIcon({
              hasUnreadMessages: Boolean(unreadMessageCount),
            })}
          </span>
        ) : (
          <Bell
            className={props.className}
            hasUnreadMessages={Boolean(unreadMessageCount)}
            onMouseEnter={handleBellOnMouseEnter}
          />
        )}
      </StyledTippy>
    </ThemeProvider>
  );
};

export default Inbox;
