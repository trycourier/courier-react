import React from "react";
import Message from "../Message";

import { InboxProps } from "../../types";
import { Body, Footer, Header, Loading } from "./styled";

import useMessages from "../../hooks/use-messages";

const Messages: React.FunctionComponent<InboxProps> = ({
  title = "Inbox",
  renderHeader,
  renderFooter,
  renderMessage,
}) => {
  const messageResults = useMessages();

  return (
    <>
      {renderHeader ? (
        renderHeader({})
      ) : (
        <Header data-testid="header">{title}</Header>
      )}
      <Body data-testid="messages">
        {messageResults?.loading ? (
          <Loading size={100} color="#9E3789" />
        ) : (
          messageResults?.data?.messages?.nodes?.map((message) =>
            renderMessage ? (
              renderMessage(message)
            ) : (
              <Message key={message.messageId} {...message} />
            )
          )
        )}
      </Body>
      {renderFooter ? renderFooter({}) : <Footer />}
    </>
  );
};

export default Messages;
