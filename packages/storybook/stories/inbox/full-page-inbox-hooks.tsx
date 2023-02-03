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
    renewSession,
  } = useElementalInbox();

  const courier = useCourier();

  useEffect(() => {
    setTimeout(() => {
      console.log("close");
      courier.transport.closeConnection();
    }, 5000);

    setTimeout(() => {
      console.log("renew");
      renewSession(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InVzZXJfaWQ6NzBmNmE0ZjQtMjkwNy00NTE4LWI4ZjMtYjljZmFiMjI0NzY0IGluYm94OnJlYWQ6bWVzc2FnZXMgaW5ib3g6d3JpdGU6ZXZlbnRzIiwidGVuYW50X3Njb3BlIjoicHVibGlzaGVkL3Byb2R1Y3Rpb24iLCJ0ZW5hbnRfaWQiOiI3NjgyNTFjZi0zZWI4LTQyNmEtOTJlYi1mYWEwZTc2Nzg3NjgiLCJpYXQiOjE2NzU0NTM1MDQsImp0aSI6IjZiYjYzMTkyLTE1NWEtNGQwYS04ODhjLWE5N2E5ZjNlMDM1NCJ9.Crj_YzZoadasiAKLxt5I-LXEoXgLPQwjP2z6jolTb1w"
      );
    }, 10000);
  });

  useEffect(() => {
    console.log("newgetUnreadMessageCount");
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
