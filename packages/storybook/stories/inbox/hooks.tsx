import React, { useEffect } from "react";
import { useInbox, ITab } from "@trycourier/react-inbox";

export const MyCustomInbox: React.FunctionComponent = () => {
  const {
    currentTab,
    fetchMessages,
    isLoading,
    messages = [],
    unreadMessageCount,
    getMessageCount,
    setCurrentTab,
    tabs,
  } = useInbox();

  const handleOnClickTab = (newTab: ITab) => (event: React.MouseEvent) => {
    event.preventDefault();
    setCurrentTab(newTab);
  };

  useEffect(() => {
    getMessageCount();
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
      {tabs?.map((tab) => (
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
