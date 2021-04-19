import React from "react";
import { Container, MarkAllAsRead } from "./styled";
import { IHeaderProps } from "./types";

const Header: React.FunctionComponent<IHeaderProps> = ({
  title,
  unreadMessageCount,
  currentTab,
  markAllAsRead,
  messages = [],
}) => {
  return (
    <Container data-testid="header">
      {title}
      {unreadMessageCount ? ` (${unreadMessageCount})` : ""}
      {currentTab?.filter?.isRead === false && messages.length > 0 && (
        <MarkAllAsRead onClick={markAllAsRead} style={{ cursor: "pointer" }}>
          Mark all as read
        </MarkAllAsRead>
      )}
    </Container>
  );
};

export default Header;
