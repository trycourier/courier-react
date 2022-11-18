import React, { useEffect } from "react";
import { useElementalInbox } from "@trycourier/react-hooks";

export const FullPageInboxHooks: React.FunctionComponent = () => {
  const {
    fetchMessages,
    getUnreadMessageCount,
    isLoading,
    markMessageRead,
    markMessageUnread,
    markAllAsRead,
    messages = [],
    unreadMessageCount,
  } = useElementalInbox();

  useEffect(() => {
    getUnreadMessageCount();
    fetchMessages();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#4caf507d",
        padding: "10px",
        borderRadius: "12px",
        height: "100%",
      }}
    >
      <h3>My Inbox</h3>
      <div>Unread Messages: {unreadMessageCount}</div>
      <button onClick={() => markAllAsRead()}>Mark All Read</button>
      {!isLoading &&
        messages?.map((message) => (
          <div
            className="message"
            style={{
              backgroundColor: "pink",
              padding: "10px",
              borderRadius: "12px",
              width: 250,
              margin: 6,
            }}
            key={message?.messageId}
          >
            <div>MessageId: {message?.messageId}</div>
            <div>Title: {message?.title}</div>
            <div>Read: {message?.read}</div>
            {message?.read ? (
              <button onClick={() => markMessageUnread(message?.messageId)}>
                Mark as Unread
              </button>
            ) : (
              <button onClick={() => markMessageRead(message?.messageId)}>
                Mark as Read
              </button>
            )}
            <hr />
          </div>
        ))}
      {isLoading && messages?.length === 0 && <div>Loading</div>}
    </div>
  );
};
