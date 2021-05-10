import React, { useEffect, useRef, useState } from "react";
import Message from "../Message";
import { InboxProps } from "../../types";
import TabList from "../TabList";
import { MessageList, Empty, Footer } from "./styled";
import Loading from "./loading";
import PaginationEnd from "./PaginationEnd";
import CourierLogo from "~/assets/courier_logo_text.svg";
import { useAtBottom } from "~/hooks/use-at-bottom";
import useInbox from "~/hooks/use-inbox";
import Header from "./Header";
import { InboxView } from "./Header/types";
//import { PreferenceList } from "@trycourier/react-preferences";

const Messages: React.ForwardRefExoticComponent<
  InboxProps & {
    ref: React.ForwardedRef<HTMLDivElement>;
  }
> = React.forwardRef(
  ({ title = "Inbox", renderHeader, renderMessage }, ref) => {
    const {
      fetchMessages,
      markAllAsRead,
      currentTab,
      isLoading,
      messages = [],
      startCursor,
      unreadMessageCount,
    } = useInbox();
    const messageListRef = useRef<HTMLDivElement>(null);

    const [view, setView] = useState<InboxView>("messages");

    useAtBottom(
      messageListRef,
      () => {
        if (isLoading || !startCursor) {
          return;
        }

        fetchMessages({
          ...currentTab?.filter,
          after: startCursor,
        });
      },
      [isLoading, startCursor, currentTab]
    );

    useEffect(() => {
      fetchMessages(currentTab?.filter);
    }, [currentTab]);

    return (
      <div ref={ref}>
        {renderHeader ? (
          renderHeader({})
        ) : (
          <Header
            currentTab={currentTab}
            title={title}
            unreadMessageCount={unreadMessageCount}
            markAllAsRead={markAllAsRead}
            messages={messages}
            view={view}
            onViewToggle={setView}
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
          {
            /*<PreferenceList />*/
          }
        )}

        <Footer>
          <a href="https://www.courier.com">
            Powered by&nbsp;&nbsp;
            <CourierLogo />
          </a>
        </Footer>
      </div>
    );
  }
);

export default Messages;
