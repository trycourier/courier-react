import React, { useMemo } from "react";
import deepExtend from "deep-extend";
import styled from "styled-components";
import { Icon, icons, Title } from "@trycourier/react-shared";

export const Container = styled.div(({ theme }) =>
  deepExtend(
    {
      display: "flex",
      position: "relative",
      padding: "10px 12px 10px 30px",
      backgroundColor: "#F9FAFB",
      alignItems: "center",
      marginTop: 6,
      borderRadius: 6,
      borderBottom: "1px solid rgba(203,213,224,.5)",
      "&.read": {
        backgroundColor: "#F7F6F9",
      },
      "&:not(.read):hover": {
        background: "#EDE4ED",
      },
      scrollSnapAlign: "start",
    },
    theme.message?.container ?? {}
  )
);

export const Contents = styled.div(({ theme }) => ({
  marginRight: "auto",
  marginLeft: 15,
  textAlign: "left",
  ...theme.message?.contents,
}));

export const MessageTitle = (props: { theme?: any }) => (
  <Title css={props.theme} />
);

export const TextBlock = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "#73819B",
      marginTop: "1px",
      wordBreak: "break-word",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "16px",
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    theme.message?.textBlock
  )
);

export const ActionBlock = styled.div(({ theme }) =>
  deepExtend(
    {
      a: {
        display: "inline-block",
        cursor: "pointer",
        border: "none",
        fontSize: 12,
        color: "white",
        backgroundColor: theme?.brand?.colors?.primary ?? "#9121C2",
        padding: "6px 15px",
        marginTop: 3,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        textDecoration: "none",
        "&:active": {
          boxShadow: "none",
        },

        "&:hover": {
          color: "#73819B",
          background: "rgb(0 0 0 / 10%)",
        },

        borderRadius: 4,
      },
    },
    theme?.message?.actionBlock
  )
);

export const TimeAgo = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "#aaa",
      fontSize: "10px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "14px",
      whiteSpace: "nowrap",
      maxWidth: "65px",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    theme.message?.timeAgo
  )
);

export const UnreadIndicator = styled.div(({ theme }) =>
  deepExtend(
    {
      height: 8,
      width: 8,
      backgroundColor: theme?.brand?.colors?.primary ?? "#9121c2",
      borderRadius: "50%",
      position: "absolute",
      left: "13px",
    },
    theme?.message?.unreadIndicator
  )
);

export const MessageIcon = (props: { src: string; theme?: any }) => (
  <Icon
    fill={props.theme?.brand?.colors?.primary}
    css={props.theme.message?.icon}
    {...props}
  />
);

export const getIcon = (icon?: false | string) => {
  return useMemo(() => {
    if (icon === false) {
      return;
    }

    if (icon && typeof icon === "string") {
      return <MessageIcon src={icon} />;
    }

    return <icons.CourierIcon />;
  }, [icon]);
};
