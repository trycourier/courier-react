import React, { useMemo } from "react";
import deepExtend from "deep-extend";
import styled from "styled-components";
import CourierSvg from "~/assets/courier_icon.svg";

export const Container = styled.div(({ theme }) =>
  deepExtend(
    {
      display: "flex",
      position: "relative",
      padding: "10px 15px",
      backgroundColor: "#F9FAFB",
      alignItems: "center",
      maxHeight: 90,
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
  maxWidth: "58%",
  marginLeft: 18,
  ...theme.message?.contents,
}));

export const Title = styled.div(({ theme }) =>
  deepExtend(
    {
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "19.1px",
      letterSpacing: "0em",
      textAlign: "left",
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: "1",
      WebkitBoxOrient: "vertical",
      color: "#24324B",
    },
    theme.message?.title
  )
);

export const Body = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "#666666",
      marginTop: "1px",
      wordBreak: "break-word",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "16px",
      letterSpacing: "0em",
      textAlign: "left",
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
    },
    theme.message?.body
  )
);

export const TimeAgo = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "#aaa",
      marginTop: "2px",
      fontSize: "10px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "14px",
      letterSpacing: "0em",
      textAlign: "left",
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

export const UnreadIndicator = styled.div(({ theme }) =>
  deepExtend(
    {
      height: "36px",
      backgroundColor: theme?.brand?.colors?.tertiary ?? "#9121c2",
      width: "5px",
      position: "absolute",
      left: "0",
    },
    theme?.message?.unreadIndicator
  )
);

export const Icon = styled.img(iconStyles);
const CourierIcon = styled(CourierSvg)(iconStyles);

export const getIcon = (icon?: false | string) => {
  return useMemo(() => {
    if (icon === false) {
      return;
    }

    if (typeof icon === "string") {
      return <Icon src={icon} />;
    }

    return <CourierIcon />;
  }, [icon]);
};
