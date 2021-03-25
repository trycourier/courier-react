import React from "react";
import Message from "../Message";

import { InboxProps } from "../../types";
import { Body, Footer, Header, HeaderText, BodyText, Empty } from "./styled";

import TabBar from '../TabBar';
import Loading from "./loading";

import useInbox from "../../hooks/use-inbox";
import useMessages from "~/hooks/use-messages";
import CourierLogo from './courier_logo_text.svg'

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
          <BodyText style={{cursor: 'pointer'}}>Mark all as read</BodyText>
        </Header>
      )}
      <TabBar />
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
          <Empty>You have no notifications at this time</Empty>
        )}
      </Body>
      {renderFooter ? renderFooter({}) : (
      <Footer>
        <div>Powered by&nbsp;<CourierLogo /></div>
      </Footer>)}
    </>
  );
};

export default Messages;
