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
import {
  ResponsiveContainer,
  DismissInbox,
  MessageListContainer,
  MessageList,
  Empty,
  Footer,
} from "./styled";
import CourierLogo from "~/assets/courier_logo_text.svg";

const Messages: React.ForwardRefExoticComponent<
  InboxProps & {
    isMobile?: boolean;
    ref: React.ForwardedRef<HTMLDivElement>;
  }
> = React.forwardRef(
  (
    {
      isMobile,
      renderContainer,
      renderHeader,
      renderMessage,
      renderFooter,
      renderTabs,
      renderNoMessages,
    },
    ref
  ) => {
    const { fetchRecipientPreferences } = usePreferencesActions();

    const {
      title = "Inbox",
      brand,
      currentTab,
      fetchMessages,
      isLoading,
      markAllAsRead,
      messages = [],
      startCursor,
      unreadMessageCount,
      view,
      tabs,
      toggleInbox,
    } = useInbox();

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

    const handleCloseInbox = () => {
      toggleInbox();
    };
    const Container = renderContainer ? renderContainer : MessageListContainer;

    return (
      <ResponsiveContainer ref={ref} isMobile={isMobile}>
        {isMobile && <DismissInbox onClick={handleCloseInbox}>X</DismissInbox>}
        <Container>
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
              {renderTabs ? renderTabs({ tabs, currentTab }) : <TabList />}
              <MessageList
                ref={messageListRef}
                isMobile={isMobile}
                data-testid="messages"
              >
                {messages?.map((message) =>
                  renderMessage ? (
                    renderMessage(message)
                  ) : (
                    <Message key={message.messageId} {...message} />
                  )
                )}
                {isLoading && <Loading />}
                {!isLoading &&
                  messages?.length === 0 &&
                  (renderNoMessages ? (
                    renderNoMessages({})
                  ) : (
                    <Empty>You have no notifications at this time</Empty>
                  ))}
                {!isLoading && messages?.length > 5 && !startCursor && (
                  <PaginationEnd title="End Of The Road" />
                )}
              </MessageList>
            </>
          ) : (
            <PreferenceList />
          )}
        </Container>
        {renderFooter
          ? renderFooter({})
          : !brand?.inapp?.disableCourierFooter && (
              <Footer>
                <a href="https://www.courier.com">
                  Powered by&nbsp;&nbsp;
                  <CourierLogo />
                </a>
              </Footer>
            )}
      </ResponsiveContainer>
    );
  }
);

export default Messages;
