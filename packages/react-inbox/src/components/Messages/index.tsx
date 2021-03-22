import React from "react";
import Message from "../Message";

import { InboxProps } from "../../types";
import { Body, Footer, Header } from "./styled";

import Loading from "./loading";

import useInbox from "../../hooks/use-inbox";
import useMessages from "~/hooks/use-messages";

const Messages: React.FunctionComponent<InboxProps> = ({
  title = "Inbox",
  renderHeader,
  renderFooter,
  renderMessage,
}) => {
  useMessages();
  const { messages, isLoading } = useInbox();

  return (
    <>
      {renderHeader ? (
        renderHeader({})
      ) : (
        <Header data-testid="header">{title}</Header>
      )}
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
