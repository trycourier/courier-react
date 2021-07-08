import React from "react";
import {
  Container,
  MarkAllAsRead,
  Heading,
  PreferenceSubHeader,
} from "./styled";
import { IHeaderProps } from "./types";
import SettingsSvg from "~/assets/icon-settings.svg";
import styled from "styled-components";
import useInbox from "~/hooks/use-inbox";
import { useCourier } from "@trycourier/react-provider";

export const SettingsIconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  outline: none;
  border: none;
  padding: 0;
  background: transparent;
  margin-right: -15px;
  padding: 0 12px;
  cursor: pointer;
`;

const Header: React.FunctionComponent<IHeaderProps> = ({
  title,
  unreadMessageCount,
  currentTab,
  markAllAsRead,
  messages = [],
}) => {
  const { brand } = useCourier();
  const { view, setView } = useInbox();
  const handleSetView = (newView) => (event: React.MouseEvent) => {
    event.preventDefault();
    setView(newView);
  };

  return view === "messages" ? (
    <Container data-testid="header">
      <Heading alignItems="center">
        {title}
        {unreadMessageCount && (
          <span className="message-count">
            {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
          </span>
        )}
      </Heading>
      <div className="actions">
        {currentTab?.filters?.isRead === false && messages.length > 0 && (
          <MarkAllAsRead onClick={markAllAsRead} style={{ cursor: "pointer" }}>
            Mark all as read
          </MarkAllAsRead>
        )}
        {brand?.preferenceTemplates?.length > 0 && (
          <SettingsIconButton onClick={handleSetView("preferences")}>
            <SettingsSvg />
          </SettingsIconButton>
        )}
      </div>
    </Container>
  ) : (
    <Container data-testid="header" view="preferences">
      <Heading flexDirection="column">
        Preferences
        <PreferenceSubHeader onClick={handleSetView("messages")}>
          {`◀ Back to Inbox`}
        </PreferenceSubHeader>
      </Heading>
      <SettingsIconButton onClick={handleSetView("messages")}>
        <SettingsSvg />
      </SettingsIconButton>
    </Container>
  );
};

export default Header;
