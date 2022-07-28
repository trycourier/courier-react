import React, { useMemo, useEffect, useState } from "react";
import {
  Inbox,
  IInboxMessagePreview,
  IInboxMessage,
} from "@trycourier/client-graphql";
import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  align-items: top;

  button {
    cursor: pointer;
  }
`;

const Message: React.FunctionComponent<{
  message: IInboxMessage;
}> = ({ message }) => {
  if (!message?.content?.html) {
    return null;
  }

  return (
    <div key={message.messageId}>
      <div>
        <strong>Message Id: </strong>
        {message.messageId}
      </div>
      <iframe srcDoc={message?.content?.html} sandbox="allow-same-origin" />
      <hr />
    </div>
  );
};

const MessagesExample: React.FunctionComponent<{
  userId: string;
  clientKey: string;
}> = ({ userId, clientKey }) => {
  const inboxApi = useMemo(
    () =>
      Inbox({
        apiUrl: process.env.INBOX_API_URL,
        userId,
        clientKey,
      }),
    [userId, clientKey]
  );

  const [messages, setMessages] = useState<IInboxMessagePreview[]>();
  const [message, setMessage] = useState<IInboxMessage>();

  const handleSelectMessage =
    (messageId: string) => async (event: React.MouseEvent) => {
      event.preventDefault();
      const result = await inboxApi.getMessage(messageId);
      console.log("message", message);
      if (!result?.message) {
        return;
      }

      setMessage(result?.message);
    };

  useEffect(() => {
    const getInboxCount = async () => {
      const result = await inboxApi.getMessages();
      setMessages(result?.messages);
    };

    getInboxCount();
  }, []);

  return (
    <div>
      {typeof messages === "undefined" ? (
        "Loading..."
      ) : (
        <Styled>
          <div className="list">
            {messages.map((m) => (
              <div key={m.messageId}>
                <button onClick={handleSelectMessage(m.messageId)}>
                  <strong>Message Id: </strong>
                  {m.messageId}
                </button>
                <div>
                  <strong>Preview: </strong>
                  {m.preview}
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="details">
            {message && <Message message={message} />}
          </div>
        </Styled>
      )}
    </div>
  );
};

export default MessagesExample;
