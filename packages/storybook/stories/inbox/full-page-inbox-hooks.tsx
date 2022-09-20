import React, { useEffect } from "react";
import { useElementalInbox } from "@trycourier/react-hooks";

export const FullPageInboxHooks: React.FunctionComponent = () => {
  const {
    fetchMessages,
    isLoading,
    messages = [],
    unreadMessageCount,
    getUnreadMessageCount,
  } = useElementalInbox();

  useEffect(() => {
    getUnreadMessageCount();
    fetchMessages();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "pink",
        padding: "10px",
        borderRadius: "12px",
        width: 250,
        height: 300,
      }}
    >
      <h3>My Inbox</h3>
      <div>Unread Messages: {unreadMessageCount}</div>
      {!isLoading &&
        messages?.map((message) => (
          <div key={message.messageId}>
            <div>MessageId: {message.messageId}</div>
            <div>Title: {message.title}</div>
          </div>
        ))}
      {isLoading && messages?.length === 0 && <div>Loading</div>}
    </div>
  );
};
