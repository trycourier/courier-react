import React, { useMemo, useState } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier } from "@trycourier/react-provider";
import styled from "styled-components";
import deepExtend from "deep-extend";

import { IMessage, ITab, InboxProps } from "~/types";
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
      position: "relative",
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

const DropdownOptionButton = styled.button(({ theme, disabled }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return {
    background: "transparent",
    border: "none",
    cursor: disabled ? "default" : "pointer",
    padding: "6px",
    color: "rgba(28, 39, 58, 1)",
    fontweight: 700,
    fontsize: "16px",
    display: "flex",
    alignItems: "center",

    svg: {
      marginLeft: "3px",
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
  };
});

const HeadingDropdownButtonContainer = styled.div<{
  flexDirection?: "column";
  alignItems?: "center";
  hasDropdownOptions?: boolean;
}>(({ theme, flexDirection, alignItems, hasDropdownOptions }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  const styles = {
    display: "flex",
    flexDirection,
    alignItems,
    borderRadius: 6,

    "svg path": {
      fill: theme.brand?.colors?.primary,
    },
  };

  if (hasDropdownOptions) {
    styles["&:hover"] = {
      background: `linear-gradient(180deg, ${tcPrimaryColor.setAlpha(
        0.2
      )} 0%, ${tcPrimaryColor.setAlpha(0.2)} 0.01%, ${tcPrimaryColor.setAlpha(
        0.08
      )} 100%)`,
    };
  }

  return styles;
});

const HeadingDropdownOptions = styled.div(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return {
    position: "absolute",
    top: "42px",
    left: 0,
    background: "#f2f6f9",
    width: "100%",
    zIndex: 2,

    [DropdownOptionButton]: {
      width: "100%",
      "&:hover": {
        background: `linear-gradient(180deg, ${tcPrimaryColor.setAlpha(
          0.2
        )} 0%, ${tcPrimaryColor.setAlpha(0.2)} 0.01%, ${tcPrimaryColor.setAlpha(
          0.08
        )} 100%)`,
      },
    },
  };
});

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
      setShowDropdown(false);
    };

  const handleShowDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const options = useMemo(() => {
    return [
      {
        id: "messages",
        Component: ({
          onClick,
          disabled,
        }: {
          onClick?: React.MouseEventHandler;
          disabled?: boolean;
        }) => (
          <DropdownOptionButton
            disabled={disabled}
            onClick={onClick ?? handleSetView("messages")}
          >
            {title}
            {unreadMessageCount ? (
              <span className="message-count">
                {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
              </span>
            ) : undefined}
            {onClick && !disabled && (
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.0025 4.9925C3.7425 4.9925 3.4925 4.8925 3.2925 4.7025L0.2925 1.7025C-0.0975 1.3125 -0.0975 0.6825 0.2925 0.2925C0.6825 -0.0975 1.3125 -0.0975 1.7025 0.2925L3.6425 2.2325C3.8425 2.4325 4.1525 2.4325 4.3525 2.2325L6.2925 0.2925C6.6825 -0.0975 7.3125 -0.0975 7.7025 0.2925C8.0925 0.6825 8.0925 1.3125 7.7025 1.7025L4.7025 4.7025C4.5025 4.9025 4.2525 4.9925 3.9925 4.9925H4.0025Z" />
              </svg>
            )}
          </DropdownOptionButton>
        ),
      },
      brand?.preferenceTemplates?.length && {
        id: "preferences",
        Component: ({ onClick }: { onClick?: React.MouseEventHandler }) => (
          <DropdownOptionButton
            onClick={onClick ?? handleSetView("preferences")}
          >
            Preferences
            {onClick && (
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.0025 4.9925C3.7425 4.9925 3.4925 4.8925 3.2925 4.7025L0.2925 1.7025C-0.0975 1.3125 -0.0975 0.6825 0.2925 0.2925C0.6825 -0.0975 1.3125 -0.0975 1.7025 0.2925L3.6425 2.2325C3.8425 2.4325 4.1525 2.4325 4.3525 2.2325L6.2925 0.2925C6.6825 -0.0975 7.3125 -0.0975 7.7025 0.2925C8.0925 0.6825 8.0925 1.3125 7.7025 1.7025L4.7025 4.7025C4.5025 4.9025 4.2525 4.9925 3.9925 4.9925H4.0025Z" />
              </svg>
            )}
          </DropdownOptionButton>
        ),
      },
    ].filter(Boolean);
  }, [brand?.preferenceTemplates?.length, title, unreadMessageCount]);

  const ActiveOption = options?.find((o) => o.id === view)?.Component;
  const hasDropdownOptions = options?.length > 1;

  return (
    <Container data-testid="header">
      <HeadingDropdownButtonContainer
        alignItems="center"
        hasDropdownOptions={hasDropdownOptions}
      >
        {ActiveOption && (
          <ActiveOption
            disabled={!hasDropdownOptions}
            onClick={handleShowDropdown}
          />
        )}
      </HeadingDropdownButtonContainer>
      {showDropdown && (
        <HeadingDropdownOptions>
          {options
            .map((o) => {
              if (o.id === view) {
                return null;
              }

              return <o.Component key={o.id} />;
            })
            .filter(Boolean)}
        </HeadingDropdownOptions>
      )}
      <div className="actions">
        {((currentTab?.filters?.isRead === false && messages.length > 0) ||
          tabs === undefined) && <MarkAllRead onClick={markAllAsRead} />}
      </div>
    </Container>
  );
};

export default Header;
