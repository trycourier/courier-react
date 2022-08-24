import React from "react";
import SettingsSvg from "~/assets/icon-settings.svg";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import styled from "styled-components";
import deepExtend from "deep-extend";

import { IMessage, ITab, InboxProps } from "~/types";
import Settings from "./actions/Settings";
import MarkAllRead from "./actions/MarkAllRead";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  currentTab?: ITab;
  labels: InboxProps["labels"];
  markAllAsRead: () => void;
  messages: IMessage[];
  title?: string;
  unreadMessageCount?: number;
}

const Container = styled.div<{ view?: string }>(({ theme }) =>
  deepExtend(
    {
      padding: "18px",
      userSelect: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 16,
      fontWeight: 700,
      height: "42px",
      color: "rgb(36, 50, 75)",
      backgroundColor: "#F2F6F9",

      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    },
    theme?.header
  )
);

const Heading = styled.div<{
  flexDirection?: "column";
  alignItems?: "center";
}>(({ theme, flexDirection, alignItems }) => ({
  display: "flex",
  flexDirection,
  alignItems,

  ".message-count": {
    fontSize: 14,
    marginLeft: 14,
    backgroundImage: `linear-gradient(180deg, ${theme.brand?.colors?.primary}, 90%, transparent 100%)`,
    color: "white",
    borderRadius: "17px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 18,
    padding: "0 6px",
    minWidth: 28,
  },
}));

const PreferenceSubHeader = styled.a(({ theme }) => ({
  cursor: "pointer",
  color: theme?.brand?.colors?.primary ?? "#9121c2",
  fontSize: "12px",
}));

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
  currentTab,
  labels,
  markAllAsRead,
  messages = [],
  title,
  unreadMessageCount,
}) => {
  const { brand } = useCourier();
  const { view, setView, tabs } = useInbox();
  const handleSetView = (newView) => (event: React.MouseEvent) => {
    event.preventDefault();
    setView(newView);
  };

  console.log("unreadMessageCount", unreadMessageCount);

  return view === "messages" ? (
    <Container data-testid="header">
      <Settings
        visible={brand?.preferenceTemplates?.length}
        onClick={handleSetView("preferences")}
      />
      <Heading alignItems="center">
        {title}
        {unreadMessageCount ? (
          <span className="message-count">
            {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
          </span>
        ) : undefined}
      </Heading>
      <div className="actions">
        {((currentTab?.filters?.isRead === false && messages.length > 0) ||
          tabs === undefined) && <MarkAllRead onClick={markAllAsRead} />}
      </div>
    </Container>
  ) : (
    <Container data-testid="header" view="preferences">
      <Heading flexDirection="column">
        Preferences
        <PreferenceSubHeader onClick={handleSetView("messages")}>
          {`◀ ${labels?.backToInbox ?? "Back to Inbox"}`}
        </PreferenceSubHeader>
      </Heading>
      <SettingsIconButton onClick={handleSetView("messages")}>
        <SettingsSvg />
      </SettingsIconButton>
    </Container>
  );
};

export default Header;
