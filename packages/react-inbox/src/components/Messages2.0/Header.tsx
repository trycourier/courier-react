import React, { useMemo, useState } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import styled from "styled-components";
import deepExtend from "deep-extend";

import { IMessage, ITab, InboxProps } from "~/types";
import Settings from "./actions/Settings";
import MarkAllRead from "./actions/MarkAllRead";
import tinycolor2 from "tinycolor2";

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
      padding: "6px",
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

const HeadingDropdownButton = styled.button<{
  flexDirection?: "column";
  alignItems?: "center";
}>(({ theme, flexDirection, alignItems }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return {
    display: "flex",
    cursor: "pointer",
    border: "none",
    padding: 6,
    color: "rgba(28, 39, 58, 1)",
    fontWeight: 700,
    fontSize: "16px",
    background: "transparent",
    flexDirection,
    alignItems,
    borderRadius: 6,

    "&:hover": {
      background: `linear-gradient(180deg, ${tcPrimaryColor.setAlpha(
        0.2
      )} 0%, ${tcPrimaryColor.setAlpha(0.2)} 0.01%, ${tcPrimaryColor.setAlpha(
        0.08
      )} 100%)`,
    },

    ".message-count": {
      fontSize: 14,
      margin: "0 3px",
      backgroundImage: `linear-gradient(180deg, ${primaryColor} 0%, ${tcPrimaryColor.setAlpha(
        0.6
      )} 100%)`,
      color: "white",
      borderRadius: "17px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 18,
      padding: "0 6px",
      minWidth: 28,
    },

    "svg path": {
      fill: theme.brand?.colors?.primary,
    },
  };
});

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
  markAllAsRead,
  messages = [],
  title,
  unreadMessageCount,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { brand } = useCourier();
  const { view, setView, tabs } = useInbox();
  const handleSetView =
    (newView: "messages" | "preferences") => (event: React.MouseEvent) => {
      event.preventDefault();
      setView(newView);
    };

  const handleShowDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const options = useMemo(() => {
    return [
      {
        id: "messages",
        component: () => (
          <>
            {title}
            {unreadMessageCount ? (
              <span className="message-count">
                {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
              </span>
            ) : undefined}
          </>
        ),
      },
      {
        id: "preferences",
        component: () => (
          <Settings
            visible={brand?.preferenceTemplates?.length}
            onClick={handleSetView("preferences")}
          />
        ),
      },
    ];
  }, []);

  const ActiveOption = options?.find((o) => o.id === view)?.component;

  return (
    <Container data-testid="header">
      <HeadingDropdownButton
        alignItems="center"
        onClick={handleShowDropdown}
        disabled={showDropdown}
      >
        {ActiveOption && <ActiveOption />}
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.0025 4.9925C3.7425 4.9925 3.4925 4.8925 3.2925 4.7025L0.2925 1.7025C-0.0975 1.3125 -0.0975 0.6825 0.2925 0.2925C0.6825 -0.0975 1.3125 -0.0975 1.7025 0.2925L3.6425 2.2325C3.8425 2.4325 4.1525 2.4325 4.3525 2.2325L6.2925 0.2925C6.6825 -0.0975 7.3125 -0.0975 7.7025 0.2925C8.0925 0.6825 8.0925 1.3125 7.7025 1.7025L4.7025 4.7025C4.5025 4.9025 4.2525 4.9925 3.9925 4.9925H4.0025Z" />
        </svg>
      </HeadingDropdownButton>
      <div className="actions">
        {((currentTab?.filters?.isRead === false && messages.length > 0) ||
          tabs === undefined) && <MarkAllRead onClick={markAllAsRead} />}
      </div>
    </Container>
  );
};

export default Header;
