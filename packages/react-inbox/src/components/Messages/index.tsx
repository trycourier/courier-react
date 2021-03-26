import React, {
  useEffect, useRef,
} from "react";
import Message from "../Message";

import { InboxProps } from "../../types";
import TabBar from "../TabBar";
import {
  Body, Footer, Header, HeaderText, BodyText, Empty,
} from "./styled";
import Loading from "./loading";
import CourierLogo from "./courier_logo_text.svg";
import { useAtBottom } from "~/hooks/user-at-bottom";
import useMessages from "~/hooks/use-messages";

const Messages: React.FunctionComponent<InboxProps> = ({
  title = "Inbox",
  renderHeader,
  renderFooter,
  renderMessage,
  unreadCount,
}) => {
  const containerRef = useRef<HTMLDivElement>();
  const { atBottom, reset } = useAtBottom(containerRef.current);
  const {
    messages, isLoading, fetchMore,
  } = useMessages();

  useEffect(() => {
    if (atBottom && !isLoading) {
      fetchMore();
      reset();
    }
  }, [atBottom, fetchMore, isLoading, reset]);
  return (
    <>
      {renderHeader ? (
        renderHeader({})
      ) : (
        <Header data-testid="header">
          <HeaderText>{title}{unreadCount ? ` (${unreadCount})` : ""}</HeaderText>
          <BodyText style={{ cursor: "pointer" }}>Mark all as read</BodyText>
        </Header>
      )}
      <TabBar />
      <Body ref={containerRef as React.RefObject<HTMLDivElement>} data-testid="messages">
        {messages?.map((message) =>
          renderMessage ? (
            renderMessage(message)
          ) : (
            <Message key={message.messageId} {...message} />
          ),
        )
        }
        {isLoading && <Loading />}
        {!isLoading && messages?.length === 0 && (
          <Empty>You have no notifications at this time</Empty>
        )}
      </Body>
      {renderFooter ? renderFooter({}) : (
        <Footer>
          <div><span style={{ marginTop: 2 }}>Powered by&nbsp;&nbsp;</span><CourierLogo /></div>
        </Footer>)}
    </>
  );
};

export default Messages;
