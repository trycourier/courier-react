import React, { useEffect, useRef } from "react";
import Message from "../Message";
import { InboxProps } from "../../types";
import TabBar from "../TabBar";
import {
  Body,
  BodyText,
  Empty,
  Footer,
  FooterContent,
  Header,
  HeaderText,
} from "./styled";
import Loading from "./loading";
import PaginationEnd from "./PaginationEnd";
import CourierLogo from "~/assets/courier_logo_text.svg";
import { useAtBottom } from "~/hooks/use-at-bottom";
import useInbox from "~/hooks/use-inbox";

const Messages: React.FunctionComponent<InboxProps> = ({
  title = "Inbox",
  renderHeader,
  renderMessage,
}) => {
  const {
    currentTab,
    fetchMessages,
    isLoading,
    messages,
    startCursor,
    unreadMessageCount,
    markAllAsRead,
  } = useInbox();

  const ref = useRef<HTMLDivElement>(null);

  useAtBottom(
    ref,
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
    <>
      {renderHeader ? (
        renderHeader({})
      ) : (
        <Header data-testid="header">
          <HeaderText>
            {title}
            {unreadMessageCount ? ` (${unreadMessageCount})` : ""}
          </HeaderText>
          <BodyText onClick={markAllAsRead} style={{ cursor: "pointer" }}>
            Mark all as read
          </BodyText>
        </Header>
      )}
      <TabBar />
      <Body ref={ref as React.RefObject<HTMLDivElement>} data-testid="messages">
        {messages.map((message) =>
          renderMessage ? (
            renderMessage(message)
          ) : (
            <Message key={message.messageId} {...message} />
          )
        )}
        {isLoading && <Loading />}
        {!isLoading && messages.length === 0 && (
          <Empty>You have no notifications at this time</Empty>
        )}
        {!isLoading && messages.length > 5 && !startCursor && (
          <PaginationEnd title="End Of The Road" />
        )}
      </Body>
      <Footer>
        <FooterContent>
          <span style={{ marginTop: 2 }}>Powered by&nbsp;&nbsp;</span>
          <CourierLogo />
        </FooterContent>
      </Footer>
    </>
  );
};

export default Messages;
