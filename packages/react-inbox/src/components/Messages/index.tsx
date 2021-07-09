import React, { useEffect, useRef } from "react";

import {
  PreferenceList,
  usePreferencesActions,
} from "@trycourier/react-preferences";

import { useAtBottom } from "~/hooks/use-at-bottom";
import Header from "./Header";
import Loading from "./loading";
import Message from "../Message";
import PaginationEnd from "./PaginationEnd";
import TabList from "../TabList";
import useInbox from "~/hooks/use-inbox";

import { InboxProps } from "../../types";
import { Container, MessageList, Empty, Footer } from "./styled";
import CourierLogo from "~/assets/courier_logo_text.svg";

const Messages: React.ForwardRefExoticComponent<
  InboxProps & {
    ref: React.ForwardedRef<HTMLDivElement>;
  }
> = React.forwardRef(
  ({ title = "Inbox", renderHeader, renderMessage }, ref) => {
    const { fetchRecipientPreferences } = usePreferencesActions();

    const {
      brand,
      currentTab,
      fetchMessages,
      isLoading,
      markAllAsRead,
      messages = [],
      startCursor,
      unreadMessageCount,
      view,
    } = useInbox();

    console.log("messages", messages);
    const messageListRef = useRef<HTMLDivElement>(null);

    useAtBottom(
      messageListRef,
      () => {
        if (isLoading || !startCursor) {
          return;
        }

        fetchMessages({
          ...currentTab?.filters,
          after: startCursor,
        });
      },
      [isLoading, startCursor, currentTab]
    );

    useEffect(() => {
      fetchRecipientPreferences();
    }, []);

    return (
      <>
        <Container ref={ref}>
          {renderHeader ? (
            renderHeader({})
          ) : (
            <Header
              currentTab={currentTab}
              title={title}
              unreadMessageCount={unreadMessageCount}
              markAllAsRead={markAllAsRead}
              messages={messages}
            />
          )}
          {view === "messages" ? (
            <>
              <TabList />
              <MessageList ref={messageListRef} data-testid="messages">
                {messages?.map((message) =>
                  renderMessage ? (
                    renderMessage(message)
                  ) : (
                    <Message key={message.messageId} {...message} />
                  )
                )}
                {isLoading && <Loading />}
                {!isLoading && messages?.length === 0 && (
                  <Empty>You have no notifications at this time</Empty>
                )}
                {!isLoading && messages?.length > 5 && !startCursor && (
                  <PaginationEnd title="End Of The Road" />
                )}
              </MessageList>
            </>
          ) : (
            <PreferenceList />
          )}
        </Container>
        {!brand?.inapp?.disableCourierFooter && (
          <Footer>
            <a href="https://www.courier.com">
              Powered by&nbsp;&nbsp;
              <CourierLogo />
            </a>
          </Footer>
        )}
      </>
    );
  }
);

export default Messages;
