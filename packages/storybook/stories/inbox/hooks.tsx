import React, { useEffect } from "react";
import { useInbox, ITab } from "@trycourier/react-inbox";

export const MyCustomInbox: React.FunctionComponent = () => {
  const {
    currentTab,
    fetchMessages,
    isLoading,
    messages = [],
    unreadMessageCount,
    getUnreadMessageCount,
    setCurrentTab,
  } = useInbox();

  const handleOnClickTab = (newTab: ITab) => (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentTab(newTab);
  };

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
      <div>Current Tab: {currentTab?.id}</div>
      {[
        {
          id: "unread",
          label: "Unread",
          filters: {
            isRead: false,
          },
        },
        {
          id: "all",
          label: "All Messages",
          filters: {},
        },
      ]?.map((tab) => (
        <button key={tab.id} onClick={handleOnClickTab(tab)}>
          {tab.label}
        </button>
      ))}
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
