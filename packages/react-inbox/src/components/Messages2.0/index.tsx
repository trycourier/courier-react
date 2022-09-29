import React, { useEffect, useRef } from "react";

import { PreferenceList } from "@trycourier/react-preferences";

import { useAtBottom } from "~/hooks/use-at-bottom";
import Header from "./Header";
import Loading from "./Loading";
import LoadingMore from "./LoadingMore";

import Message from "./Message";
import PaginationEnd from "./PaginationEnd";
import NoMessages from "./NoMessages";
import { useInbox, usePreferences } from "@trycourier/react-hooks";

import { InboxProps } from "../../types";

import CourierLogo from "~/assets/courier-text-logo2.svg";
import styled from "styled-components";
import deepExtend from "deep-extend";

const ResponsiveContainer = styled.div<{ isMobile?: boolean }>(
  ({ theme, isMobile }) =>
    deepExtend(
      {
        ...(isMobile
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            }
          : {
              background: "#F2F6F9",
            }),
      },
      theme?.container
    )
);

const DismissInbox = styled.button(({ theme }) =>
  deepExtend(
    {
      border: "none",
      borderRadius: "50%",
      position: "absolute",
      top: 6,
      right: 8,
      cursor: "pointer",
      width: 42,
      height: 42,
      background: "rgba(115, 129, 155, 0.6)",
      color: "white",
      transition: "background 100ms ease-in",

      "&:hover": {
        background: "rgba(115, 129, 155, 0.8)",
      },
    },
    theme?.dismissInbox
  )
);

const MessageList = styled.div<{ isMobile?: boolean }>(
  ({ isMobile, theme }) => {
    const defaultHeight = 342;

    const height = (() => {
      if (!isMobile) {
        return defaultHeight;
      }

      return `Calc(100vh - 205px)`;
    })();

    return deepExtend(
      {
        background: "rgba(255, 255, 255, 0.2)",
        overflow: "scroll",
        display: "flex",
        height,
        maxHeight: height,
        flexDirection: "column",
        borderTop: "1px solid rgb(222, 232, 240)",
      },
      theme?.messageList?.container
    );
  }
);

export const Footer = styled.div(({ theme }) =>
  deepExtend(
    {
      alignItems: "center",
      background: "white",
      display: "flex",
      fontSize: "10px",
      fontStyle: "normal",
      position: "relative",
      zIndex: 1,
      fontWeight: "700",
      lineHeight: "14px",
      letterSpacing: "0.1rem",
      height: 36,
      justifyContent: "center",
      paddingRight: 18,
      svg: {
        marginLeft: -1,
        marginTop: "-4px",
      },

      a: {
        display: "flex",
        alignItems: "center",
        color: "rgba(86, 96, 116, 0.8)",
      },
    },
    theme?.footer
  )
);

const Messages: React.ForwardRefExoticComponent<
  InboxProps & {
    isMobile?: boolean;
    ref: React.ForwardedRef<HTMLDivElement>;
  }
> = React.forwardRef(
  (
    {
      defaultIcon,
      formatDate,
      isMobile,
      labels,
      openLinksInNewTab,
      renderBlocks,
      renderFooter,
      renderHeader,
      renderMessage,
      renderNoMessages,
      title,
    },
    ref
  ) => {
    const { fetchRecipientPreferences } = usePreferences();

    const {
      brand,
      currentTab,
      fetchMessages,
      isLoading,
      markAllAsRead,
      messages = [],
      startCursor,
      toggleInbox,
      unreadMessageCount,
      view,
    } = useInbox();

    const messageListRef = useRef<HTMLDivElement>(null);

    useAtBottom(
      messageListRef,
      () => {
        if (isLoading || !startCursor) {
          return;
        }

        fetchMessages({
          params: currentTab?.filters,
          after: startCursor,
        });
      },
      [isLoading, startCursor, currentTab]
    );

    useEffect(() => {
      fetchRecipientPreferences();
    }, []);

    const handleCloseInbox = (event: React.MouseEvent) => {
      event.preventDefault();
      toggleInbox(false);
    };

    return (
      <ResponsiveContainer ref={ref} isMobile={isMobile}>
        {isMobile && <DismissInbox onClick={handleCloseInbox}>X</DismissInbox>}
        {renderHeader ? (
          renderHeader({
            currentTab,
            labels,
            markAllAsRead,
            messages,
            title,
            unreadMessageCount,
          })
        ) : (
          <Header
            currentTab={currentTab}
            labels={labels}
            markAllAsRead={markAllAsRead}
            messages={messages}
            title={title}
            unreadMessageCount={unreadMessageCount}
          />
        )}
        {view === "messages" ? (
          <MessageList
            ref={messageListRef}
            isMobile={isMobile}
            data-testid="messages"
          >
            {messages?.map((message) =>
              renderMessage ? (
                renderMessage(message)
              ) : (
                <Message
                  {...message}
                  defaultIcon={defaultIcon}
                  formatDate={formatDate}
                  key={message.messageId}
                  labels={labels}
                  openLinksInNewTab={openLinksInNewTab}
                  renderBlocks={renderBlocks}
                />
              )
            )}
            {isLoading && messages?.length === 0 && <Loading />}
            {isLoading && messages?.length !== 0 && <LoadingMore />}
            {!isLoading &&
              messages?.length === 0 &&
              (renderNoMessages ? (
                renderNoMessages({})
              ) : (
                <NoMessages labels={labels} />
              ))}
            {!isLoading && messages?.length > 5 && !startCursor && (
              <PaginationEnd />
            )}
          </MessageList>
        ) : (
          <PreferenceList />
        )}
        {renderFooter
          ? renderFooter({})
          : !brand?.inapp?.disableCourierFooter && (
              <Footer>
                <a href="https://www.courier.com">
                  POWERED BY&nbsp;&nbsp;
                  <CourierLogo />
                </a>
              </Footer>
            )}
      </ResponsiveContainer>
    );
  }
);

export default Messages;
