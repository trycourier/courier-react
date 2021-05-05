import React from "react";
import {
  Container,
  MarkAllAsRead,
  Heading,
  PreferenceSubHeader,
  //MessageSubHeader,
} from "./styled";
import { IHeaderProps } from "./types";
//import SettingsSvg from "~/assets/icon-settings.svg";
import BackSvg from "~/assets/back.svg";
import styled from "styled-components";

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
  svg {
    background: #f7f6f9;
  }
`;

const Header: React.FunctionComponent<IHeaderProps> = ({
  title,
  unreadMessageCount,
  currentTab,
  markAllAsRead,
  messages = [],
  view,
  onViewToggle,
}) => {
  const [heading, action] =
    view === "messages"
      ? [
          <>
            <Heading>
              <h3>
                {title}
                {unreadMessageCount ? ` (${unreadMessageCount})` : ""}
              </h3>
              {/*<MessageSubHeader>Here is what you missed</MessageSubHeader>*/}
            </Heading>
          </>,
          currentTab?.filter?.isRead === false && messages.length > 0 && (
            <MarkAllAsRead
              onClick={markAllAsRead}
              style={{ cursor: "pointer" }}
            >
              Mark all as read
            </MarkAllAsRead>
          ),
        ]
      : [
          <>
            <Heading>
              <h3>Preferences</h3>
              <PreferenceSubHeader onClick={() => onViewToggle("messages")}>
                <BackSvg /> Back to Inbox
              </PreferenceSubHeader>
            </Heading>
          </>,
          null,
        ];

  return (
    <Container data-testid="header">
      {heading}
      {/*<SettingsIconButton onClick={() => onViewToggle("settings")}>
        <SettingsSvg />
  </SettingsIconButton>*/}
      {action}
    </Container>
  );
};

export default Header;
