import React, { useEffect, useRef } from "react";
import Message from "../Message";
import { InboxProps } from "../../types";
import TabBar from "../TabBar";
import CourierLogo from "../../assets/courier_logo_text.svg";
import {
  Body, Header, HeaderText, Empty, Footer,
} from "./styled";
import Loading from "./loading";
import EndOfTheRoad from "./EndOfTheRoad";
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
          {/*<BodyText style={{ cursor: "pointer" }}>Mark all as read</BodyText>*/}
        </Header>
      )}
      <TabBar />
      <Body ref={ref as React.RefObject<HTMLDivElement>} data-testid="messages">
        {messages.map((message) =>
          renderMessage ? (
            renderMessage(message)
          ) : (
            <Message key={message.messageId} {...message} />
          ),
        )}
        {isLoading && <Loading />}
        {!isLoading && messages.length === 0 && (
          <Empty>You have no notifications at this time</Empty>
        )}
        {!isLoading && messages.length && !startCursor && (<EndOfTheRoad />) }
      </Body>
      <Footer>
        <div><span style={{ marginTop: 2 }}>Powered by&nbsp;&nbsp;</span><CourierLogo /></div>
      </Footer>
    </>
  );
};

export default Messages;
