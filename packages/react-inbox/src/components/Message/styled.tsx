import React, { useMemo } from "react";
import deepExtend from "deep-extend";
import styled from "styled-components";
import CourierSvg from "~/assets/courier_icon.svg";
import CourierBigSvg from "~/assets/courier_big_icon.svg";

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

export const Title = styled.div<{ read?: boolean }>(({ theme, read }) =>
  deepExtend(
    {
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "16px",
      textAlign: "left",
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: read ? "rgba(86, 96, 116, 1)" : "rgb(28, 39, 58)",
    },
    theme.message?.title
  )
);

export const TextBlock = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "rgb(28, 39, 58) ",
      marginTop: "1px",
      wordBreak: "break-word",
      fontSize: "12px",
      fontStyle: "normal",
      maxWidth: 250,
      fontWeight: "400",
      lineHeight: "16px",
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "pre",
      p: {
        margin: 0,
      },
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
      color: "rgb(86, 96, 116)",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "14px",
      whiteSpace: "nowrap",
      maxWidth: "90px",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    theme.message?.timeAgo
  )
);

const iconStyles = ({ theme }) =>
  deepExtend(
    {
      height: 25,
      width: 25,
      flexShrink: "0",
      path: {
        fill: theme?.brand?.colors?.primary ?? "#9121c2",
      },
    },
    theme.message?.icon
  );

const bigIconStyles = ({ theme }) =>
  deepExtend(
    {
      height: 36,
      width: 36,
      flexShrink: "0",
      path: {
        fill: theme?.brand?.colors?.primary ?? "#9121c2",
      },
    },
    theme.message?.icon
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

export const Icon = styled.img(iconStyles);
const CourierIcon = styled(CourierSvg)(iconStyles);
const CourierBigIcon = styled(CourierBigSvg).attrs({
  className: "icon",
})(bigIconStyles);

export const getIcon = (icon?: false | string, big?: boolean) => {
  return useMemo(() => {
    if (icon === false) {
      return;
    }

    if (icon && typeof icon === "string") {
      return <Icon className="icon" src={icon} />;
    }

    if (big) {
      return <CourierBigIcon />;
    }

    return <CourierIcon />;
  }, [icon]);
};
