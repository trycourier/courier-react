import React, { useEffect, useState } from "react";

import { CourierProvider } from "@trycourier/react-provider";

export default {
  title: "Inbox/Hooks2",
};

const NotificationsProvider = ({ children }) => {
  return (
    <CourierProvider
      clientKey={"MWNlNTk1YzAtYzkwZC00NDAyLTkzZTUtMTk3OGM3ZGI2YWI3"}
      userId={String("715048")}
    >
      {children}
    </CourierProvider>
  );
};

import { useInbox } from "@trycourier/react-inbox";

export interface IHeaderNotificationsProps {
  hasUnreadNotifications: boolean;
  setShowUnreadNotifications: (setUnread: boolean) => void;
}

const HeaderNotifications = ({
  hasUnreadNotifications,
  setShowUnreadNotifications,
}: IHeaderNotificationsProps) => {
  const inbox = useInbox();
  const hasUnreadMessages = (inbox?.unreadMessageCount ?? 0) > 0;

  useEffect(() => {
    inbox.fetchMessages();
    inbox.getUnreadMessageCount();
  }, []);

  useEffect(() => {
    setShowUnreadNotifications(hasUnreadMessages);
  }, [inbox.unreadMessageCount]);

  console.log("inbox", inbox);
  return (
    <>
      {hasUnreadMessages && "hasUnreadMessages"}
      <div>{hasUnreadNotifications && <div>hasUnreadNotifications</div>}</div>
    </>
  );
};

export const MyInbox = () => {
  const [hasUnreadNotifications, setShowUnreadNotifications] = useState(false);
  return (
    <NotificationsProvider>
      <HeaderNotifications
        hasUnreadNotifications={hasUnreadNotifications}
        setShowUnreadNotifications={setShowUnreadNotifications}
      ></HeaderNotifications>
    </NotificationsProvider>
  );
};
