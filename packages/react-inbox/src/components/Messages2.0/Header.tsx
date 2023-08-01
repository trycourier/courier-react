import React, { useMemo, useState } from "react";
import { useInbox } from "@trycourier/react-hooks";
import { useCourier, IInboxMessagePreview } from "@trycourier/react-provider";
import styled from "styled-components";
import deepExtend from "deep-extend";

import { InboxProps } from "~/types";
import MarkAllRead from "./actions/MarkAllRead";
import CloseInbox from "./actions/Close";

import tinycolor2 from "tinycolor2";

export type InboxView = "settings" | "messages";
export interface IHeaderProps {
  labels: InboxProps["labels"];
  markAllAsRead: () => void;
  messages: IInboxMessagePreview[];
  views: InboxProps["views"];
  title?: string;
  unreadMessageCount?: number;
}

const Container = styled.div<{ view?: string }>(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary || "#9121C2";

  return deepExtend(
    {
      padding: "9px 6px",
      userSelect: "none",
      display: "flex",
      position: "relative",
      zIndex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 16,
      fontWeight: 700,
      height: "42px",
      color: "rgb(36, 50, 75)",
      backgroundColor: "#F2F6F9",
      borderBottom: "1px solid rgb(222, 232, 240)",

      borderTopLeftRadius: theme?.brand?.inapp?.borderRadius ?? "12px",
      borderTopRightRadius: theme?.brand?.inapp?.borderRadius ?? "12px",

      ".message-count": {
        fontSize: 14,
        fontWeight: 400,
        margin: "0 3px",
        background: primaryColor,
        color: "white",
        borderRadius: "17px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 18,
        padding: "0 6px",
        minWidth: 28,
      },

      ".actions": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
    theme?.header
  );
});

const Title = styled.div(({ theme }) => {
  return theme?.message?.title;
});

const DropdownOptionButton = styled.button<{
  active?: boolean;
  selected?: boolean;
  showDropdown?: boolean;
}>(({ theme, disabled, active, selected, showDropdown }) => {
  const primaryColor = theme.brand?.colors?.primary || "#9121C2";
  const tcPrimaryColor = tinycolor2(primaryColor);

  const cssProps = {
    background: active ? primaryColor : "transparent",
    border: "none",
    borderBottom: selected ? undefined : "1px solid #DEE8F0",
    cursor: disabled ? "default" : "pointer",
    padding: selected ? "6px" : "12px",
    color: active ? "white" : "rgba(28, 39, 58, 1)",
    fontWeight: active || selected ? 700 : 400,
    lineHeight: "21px",
    fontSize: "14px",
    display: "flex",
    height: selected ? "24px" : "42px",
    alignItems: "center",

    svg: {
      marginTop: "1px",
      marginLeft: "3px",
      ...(showDropdown
        ? {
            transform: "rotate(180deg)",
          }
        : {}),
    },
  };

  if (!selected) {
    cssProps[".message-count"] = {
      background: "white",
      color: primaryColor,
    };
  }

  if (!active && !selected) {
    cssProps["&:hover"] = {
      background: tcPrimaryColor.setAlpha(0.14),
    };
  }

  return cssProps;
});

const HeadingContainer = styled.div<{
  hasDropdownOptions?: boolean;
}>(({ theme, hasDropdownOptions }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  const styles = {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    transition: "background 200ms ease-in-out",

    "svg path": {
      fill: theme.brand?.colors?.primary,
    },
  };

  if (hasDropdownOptions) {
    styles["&:hover"] = {
      background: tcPrimaryColor.setAlpha(0.14),
    };
  } else {
    styles["paddingLeft"] = 6;
  }

  return styles;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HeadingDropdownOptions = styled.div(({ theme }) => {
  return deepExtend(
    {},
    {
      position: "absolute",
      top: "42px",
      left: 0,
      background: "white",
      width: "100%",
      zIndex: 2,
      height: "343px",

      [DropdownOptionButton]: {
        width: "100%",
      },
    },
    theme.menu
  );
});

const DownCarrot: React.FunctionComponent = () => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.0025 4.9925C3.7425 4.9925 3.4925 4.8925 3.2925 4.7025L0.2925 1.7025C-0.0975 1.3125 -0.0975 0.6825 0.2925 0.2925C0.6825 -0.0975 1.3125 -0.0975 1.7025 0.2925L3.6425 2.2325C3.8425 2.4325 4.1525 2.4325 4.3525 2.2325L6.2925 0.2925C6.6825 -0.0975 7.3125 -0.0975 7.7025 0.2925C8.0925 0.6825 8.0925 1.3125 7.7025 1.7025L4.7025 4.7025C4.5025 4.9025 4.2525 4.9925 3.9925 4.9925H4.0025Z" />
  </svg>
);

const TitleWrapper: React.FunctionComponent<{
  title?: string;
  unreadMessageCount?: number;
}> = ({ title, unreadMessageCount }) => {
  return (
    <>
      <Title role="heading">{title}</Title>
      {unreadMessageCount ? (
        <span
          aria-label={`unread message count ${unreadMessageCount}`}
          className="message-count"
        >
          {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
        </span>
      ) : undefined}
    </>
  );
};

const Header: React.FunctionComponent<IHeaderProps> = ({
  labels,
  markAllAsRead,
  messages = [],
  title,
  unreadMessageCount,
  views,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { brand } = useCourier();
  const { view, setView, toggleInbox } = useInbox();
  const handleSetView =
    (newView: string | "preferences") => (event: React.MouseEvent) => {
      event.preventDefault();
      setView(newView);
      setShowDropdown(false);
    };

  const handleShowDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleCloseInbox = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleInbox(false);
  };

  const options = useMemo(() => {
    const viewOptions = views?.map((v, index) => ({
      id: v.id,
      Component: ({
        active,
        disabled,
        onClick,
        selected,
        showDropdown,
      }: {
        active?: boolean;
        disabled?: boolean;
        onClick?: React.MouseEventHandler;
        selected?: boolean;
        showDropdown?: boolean;
      }) => (
        <DropdownOptionButton
          active={active}
          onClick={onClick ?? handleSetView(v.id)}
          selected={selected}
          showDropdown={showDropdown}
        >
          <TitleWrapper
            title={v.label}
            unreadMessageCount={index === 0 ? unreadMessageCount : undefined}
          />
          {onClick && !disabled && <DownCarrot />}
        </DropdownOptionButton>
      ),
    }));

    return [
      ...(viewOptions ?? []),
      brand?.preferenceTemplates?.length && {
        id: "preferences",
        Component: ({
          active,
          selected,
          onClick,
          showDropdown,
        }: {
          active?: boolean;
          selected?: boolean;
          onClick?: React.MouseEventHandler;
          showDropdown?: boolean;
        }) => (
          <DropdownOptionButton
            active={active}
            onClick={onClick ?? handleSetView("preferences")}
            selected={selected}
            showDropdown={showDropdown}
          >
            Preferences
            {onClick && <DownCarrot />}
          </DropdownOptionButton>
        ),
      },
    ].filter(Boolean);
  }, [brand?.preferenceTemplates?.length, title, unreadMessageCount]);

  const ActiveOption = options?.find((o) => o.id === view)?.Component;
  const hasDropdownOptions = options?.length > 1;

  return (
    <Container data-testid="header">
      {hasDropdownOptions ? (
        <>
          <HeadingContainer hasDropdownOptions={hasDropdownOptions}>
            {ActiveOption && (
              <ActiveOption
                selected={true}
                showDropdown={showDropdown}
                disabled={!hasDropdownOptions}
                onClick={handleShowDropdown}
              />
            )}
          </HeadingContainer>
          {showDropdown && (
            <HeadingDropdownOptions>
              {options
                .map((o) => {
                  return <o.Component active={o.id === view} key={o.id} />;
                })
                .filter(Boolean)}
            </HeadingDropdownOptions>
          )}
        </>
      ) : (
        <HeadingContainer tabIndex={0}>
          <TitleWrapper title={title} unreadMessageCount={unreadMessageCount} />
        </HeadingContainer>
      )}
      <div className="actions">
        {messages.length > 0 && unreadMessageCount ? (
          <MarkAllRead
            label={labels?.markAllAsRead}
            onClick={() => markAllAsRead()}
          />
        ) : null}
        <CloseInbox onClick={handleCloseInbox} tooltip="Close Inbox" />
      </div>
    </Container>
  );
};

export default Header;
