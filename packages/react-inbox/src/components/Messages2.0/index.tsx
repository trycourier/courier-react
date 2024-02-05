import React, { useEffect, useState, useRef, useMemo } from "react";

import { PreferenceList } from "@trycourier/react-preferences";

import { useInbox, usePreferences } from "@trycourier/react-hooks";
import tinycolor2 from "tinycolor2";

import { useOnScroll } from "~/hooks/use-on-scroll";
import Header from "./Header";
import LoadingMessages from "./LoadingMessages";
import LoadingMore from "./LoadingMore";

import Message from "./Message";

import { InboxProps } from "../../types";

import CourierLogo from "~/assets/courier-text-logo2.svg";
import styled from "styled-components";
import deepExtend from "deep-extend";
import { PositionRelative } from "./styled";

const ResponsiveContainer = styled.div<{ isMobile?: boolean }>(
  ({ theme, isMobile }) =>
    deepExtend(
      {
        ...(isMobile
          ? {
              "*, &": {
                boxSizing: "border-box",
              },
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            }
          : {
              "*, &": {
                boxSizing: "border-box",
              },
              background: "var(--ci-background)",
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

      return `Calc(100vh - 90px)`;
    })();

    return deepExtend(
      {
        position: "relative",
        background: "var(--ci-background)",
        overflow: "scroll",
        display: "flex",
        height,
        maxHeight: height,
        flexDirection: "column",
      },
      theme?.messageList?.container
    );
  }
);

export const Footer = styled.div(({ theme }) =>
  deepExtend(
    {
      alignItems: "center",
      background: "var(--ci-background)",
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
        marginLeft: -3,
        marginTop: -4,
      },

      "svg path": {
        fill: "currentColor",
      },

      a: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "var(--ci-text-color)",
      },
    },
    theme?.footer
  )
);

const ScrollTop = styled.button<{ text: string }>(({ theme, text }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);
  const lighten30 = tcPrimaryColor.lighten(30);

  return deepExtend(
    {},
    {
      position: "sticky",
      top: "-1px",
      width: "100%",
      height: "3px",
      zIndex: 1,
      fontSize: "12px",
      cursor: "pointer",
      background: lighten30.toString(),
      transition: "all 150ms ease-in",

      "&.hidden": {
        opacity: 0,
        visibility: "hidden",
      },

      "&::before": {
        transition: "all 150ms ease-in",
        boxSizing: "border-box",
        marginTop: "-10px",
        content: `'${text}'`,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "2px 8px",
        display: "inline-block",
        borderRadius: "10px",
        background: lighten30.toString(),
        height: "18px",
        "&:hover": {
          background: lighten30.darken(10).toString(),
        },
      },
      "&.stickied": {
        "&::before": {
          marginTop: "6px",
        },
        boxShadow: "0px 8px 24px rgba(28, 39, 58, 0.3)",
      },
      border: "none",
    },
    theme?.messageList?.scrollTop
  );
});

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
      renderFooter,
      renderHeader,
      renderMessage,
      renderNoMessages,
      renderPin,
      views,
      title,
    },
    ref
  ) => {
    const [focusedMessageId, setFocusedMessageId] = useState<string>("");
    const { fetchRecipientPreferences } = usePreferences();

    const {
      tenantId,
      brand,
      fetchMessages,
      getUnreadMessageCount,
      isLoading,
      markAllAsRead,
      messages = [],
      pinned = [],
      startCursor,
      toggleInbox,
      unreadMessageCount,
      view,
    } = useInbox();

    const scrollTopRef = useRef<HTMLButtonElement>(null);
    const messageListRef = useRef<HTMLDivElement>(null);
    const currentView = useMemo(() => {
      return views?.find((v) => v.id === view);
    }, [views, view]);

    useEffect(() => {
      if (view === "preferences") {
        return;
      }

      fetchMessages({
        params: {
          ...currentView?.params,
          tenantId,
        },
      });
    }, [tenantId, view, currentView]);

    useOnScroll(
      messageListRef,
      {
        onScroll: (element) => {
          if (!element || !scrollTopRef.current) {
            return;
          }

          const classList: Element["classList"] =
            scrollTopRef?.current?.classList;

          if (element.scrollTop < 10 && !classList?.contains("hidden")) {
            classList.add("hidden");
          }

          if (element.scrollTop >= 10 && classList?.contains("hidden")) {
            classList.remove("hidden");
          }

          const isSticky =
            scrollTopRef?.current?.offsetTop - element?.scrollTop < 7;

          if (isSticky && !classList?.contains("stickied")) {
            scrollTopRef?.current?.classList.add("stickied");
          }

          if (!isSticky && classList?.contains("stickied")) {
            scrollTopRef?.current?.classList.remove("stickied");
          }
        },
        atBottom: () => {
          if (isLoading || !startCursor) {
            return;
          }

          fetchMessages({
            after: startCursor,
            params: currentView?.params,
          });
        },
      },
      [scrollTopRef.current, isLoading, startCursor, currentView]
    );

    useEffect(() => {
      fetchRecipientPreferences(tenantId);
    }, []);

    const handleCloseInbox = (event: React.MouseEvent) => {
      event.preventDefault();
      toggleInbox(false);
    };

    const handleClickScrollTop = () => {
      getUnreadMessageCount();
      fetchMessages({
        params: currentView?.params,
      });

      if (messageListRef.current) {
        messageListRef.current.scrollTop = 0;
      }
    };

    const scrollTopMessage = useMemo(() => {
      if (typeof labels?.scrollTop === "string") {
        return labels?.scrollTop;
      }

      if (typeof labels?.scrollTop === "function") {
        return labels?.scrollTop(String(pinned.length));
      }

      if (pinned.length) {
        const label =
          brand?.inapp?.slots?.length === 1
            ? brand?.inapp?.slots?.[0]?.label?.value
            : "Important";

        return `${pinned.length} ${label ?? "Important"}`;
      }

      return "Scroll Top";
    }, [pinned.length, brand, labels?.scrollTop]);

    return (
      <ResponsiveContainer ref={ref} isMobile={isMobile}>
        {isMobile && <DismissInbox onClick={handleCloseInbox}>X</DismissInbox>}
        {renderHeader ? (
          renderHeader({
            labels,
            markAllAsRead,
            messages,
            title,
            unreadMessageCount,
          })
        ) : (
          <Header
            labels={labels}
            markAllAsRead={markAllAsRead}
            messages={messages}
            views={views}
            title={title}
            unreadMessageCount={unreadMessageCount}
          />
        )}
        <PositionRelative>
          {view !== "preferences" ? (
            <MessageList
              ref={messageListRef}
              isMobile={isMobile}
              data-testid="messages"
            >
              {pinned?.map((message) =>
                renderMessage ? (
                  renderMessage(message)
                ) : (
                  <Message
                    {...message}
                    isMobile={isMobile}
                    defaultIcon={defaultIcon}
                    formatDate={formatDate}
                    isMessageFocused={focusedMessageId === message.messageId}
                    key={message.messageId}
                    labels={labels}
                    openLinksInNewTab={openLinksInNewTab}
                    renderPin={renderPin}
                    renderActionsAsButtons={
                      brand?.inapp?.renderActionsAsButtons
                    }
                    setFocusedMessageId={setFocusedMessageId}
                  />
                )
              )}
              <ScrollTop
                className="hidden"
                disabled={isLoading}
                ref={scrollTopRef}
                onClick={handleClickScrollTop}
                text={scrollTopMessage}
              />
              {messages?.map((message) =>
                renderMessage ? (
                  renderMessage(message)
                ) : (
                  <Message
                    {...message}
                    defaultIcon={defaultIcon}
                    formatDate={formatDate}
                    isMessageFocused={focusedMessageId === message.messageId}
                    isMobile={isMobile}
                    key={message.messageId}
                    labels={labels}
                    openLinksInNewTab={openLinksInNewTab}
                    renderActionsAsButtons={
                      brand?.inapp?.renderActionsAsButtons
                    }
                    renderPin={renderPin}
                    setFocusedMessageId={setFocusedMessageId}
                  />
                )
              )}
              {!messages?.length &&
                (isLoading || !renderNoMessages ? (
                  <LoadingMessages labels={labels} noResults={!isLoading} />
                ) : (
                  renderNoMessages({})
                ))}
              {((isLoading && messages?.length > 0) ||
                (!startCursor && messages.length > 5)) && (
                <LoadingMore noResults={!isLoading} />
              )}
            </MessageList>
          ) : (
            <PreferenceList theme={{ name: "2.0" }} />
          )}
        </PositionRelative>
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
