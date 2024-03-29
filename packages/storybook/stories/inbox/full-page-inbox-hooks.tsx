import React, { useEffect } from "react";
import { useElementalInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
export const FullPageInboxHooks: React.FunctionComponent = () => {
  const {
    fetchMessages,
    getUnreadMessageCount,
    isLoading,
    markAllAsRead,
    markMessageArchived,
    markMessageRead,
    markMessageUnread,
    messages = [],
    unreadMessageCount,
  } = useElementalInbox();

  const courier = useCourier();

  useEffect(() => {
    courier.transport.onReconnection({
      id: "refetch",
      callback: () => {
        getUnreadMessageCount();
      },
    });
  }, [getUnreadMessageCount]);

  function getState() {
    getUnreadMessageCount();
    fetchMessages();
  }

  useEffect(() => {
    getState();
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
      <button
        onClick={() => {
          getState();
        }}
      >
        getstate
      </button>

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
              <>
                <button onClick={() => markMessageUnread(message?.messageId)}>
                  Mark as Unread
                </button>
                <button onClick={() => markMessageArchived(message?.messageId)}>
                  Archive
                </button>
              </>
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
