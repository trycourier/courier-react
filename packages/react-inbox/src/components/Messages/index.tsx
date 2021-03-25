import React from "react";
import Message from "../Message";

import { InboxProps } from "../../types";
import { Body, Footer, Header, HeaderText } from "./styled";

import TabBar from '../TabBar';
import Loading from "./loading";

import useInbox from "../../hooks/use-inbox";
import useMessages from "~/hooks/use-messages";

const Messages: React.FunctionComponent<InboxProps> = ({
  title = "Inbox",
  renderHeader,
  renderFooter,
  renderMessage,
  unreadCount,
}) => {
  useMessages();
  const { messages, isLoading } = useInbox();
  return (
    <>
      {renderHeader ? (
        renderHeader({})
      ) : (
        <Header data-testid="header">
          <HeaderText>{title}{unreadCount ? ` (${unreadCount})` : ''}</HeaderText>
          {/* <BodyText style={{cursor: 'pointer'}}>Mark all as read</BodyText> */}
        </Header>
      )}
      {/* <TabBar style={{margin: '24px 8px 8px 14px'}} /> */}
      <Body data-testid="messages">
        {isLoading ? (
          <Loading />
        ) : (
          messages?.map((message) =>
            renderMessage ? (
              renderMessage(message)
            ) : (
              <Message key={message.messageId} {...message} />
            )
          )
        )}
        {!isLoading && messages?.length === 0 && (
          <div>You're all caught up!</div>
        )}
      </Body>
      {renderFooter ? renderFooter({}) : <Footer />}
    </>
  );
};

export default Messages;
