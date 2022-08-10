import React, { useEffect, useRef } from "react";

import { PreferenceList } from "@trycourier/react-preferences";

import { useAtBottom } from "~/hooks/use-at-bottom";
import Header from "./Header";
import Loading from "./loading";
import Message from "../Message";
import PaginationEnd from "./PaginationEnd";
import TabList from "../TabList";
import { useInbox, usePreferences } from "@trycourier/react-hooks";

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
      defaultIcon,
      formatDate,
      isMobile,
      labels,
      openLinksInNewTab,
      renderBlocks,
      renderContainer,
      renderFooter,
      renderHeader,
      renderMessage,
      renderNoMessages,
      renderTabs,
      title = "Inbox",
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
      tabs,
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
    const Container = renderContainer ? renderContainer : MessageListContainer;

    return (
      <ResponsiveContainer ref={ref} isMobile={isMobile}>
        {isMobile && <DismissInbox onClick={handleCloseInbox}>X</DismissInbox>}
        <Container>
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
            <>
              {renderTabs ? (
                renderTabs({ tabs, currentTab })
              ) : (
                <TabList
                  isLoading={isLoading}
                  labels={labels}
                  tabs={tabs}
                  currentTab={currentTab}
                />
              )}
              <MessageList
                ref={messageListRef}
                isMobile={isMobile}
                data-testid="messages"
              >
                {!isLoading &&
                  messages?.map((message) =>
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
                {isLoading && <Loading />}
                {!isLoading &&
                  messages?.length === 0 &&
                  (renderNoMessages ? (
                    renderNoMessages({})
                  ) : (
                    <Empty>
                      {labels?.emptyState ??
                        brand?.inapp?.emptyState?.text ??
                        "You have no notifications at this time"}
                    </Empty>
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
