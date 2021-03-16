import React, { useMemo } from "react";
import styled from "styled-components";
import CourierSvg from "./courier-icon.svg";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  position: "relative",
  margin: "10px 0",
  padding: "10px 0",
  borderBottom: "1px solid #CBD5E0",
  ...theme.message?.container,
}));

export const ReadIndicator = styled.div(({ theme }) => ({
  backgroundColor: "rgba(157, 55, 137, .5)",
  height: "50px",
  width: "2px",
  position: "absolute",
  left: "0",
  ...theme.message?.read,
}));

export const Title = styled.div(({ theme }) => ({
  color: "rgb(52, 69, 99)",
  fontSize: "14px",
  lineHeight: "15px",
  ...theme.message?.title,
}));

export const Body = styled.div(({ theme }) => ({
  color: "#666666",
  marginTop: "2px",
  fontSize: "12px",
  ...theme.message?.body,
}));

export const TimeAgo = styled.div(({ theme }) => ({
  color: "#aaa",
  marginTop: "2px",
  fontSize: "10px",
  ...theme.message?.timeAgo,
}));

export const ClickAction = styled.button(({ theme }) => ({
  cursor: "pointer",
  border: "none",
  fontSize: 12,
  color: "#9E3789",
  height: 32,
  outline: "none",
  marginLeft: 6,
  width: 100,
  background: "#FFFFFF",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  "&:active": {
    boxShadow: "none",
  },

  borderRadius: 6,
  ...theme.message?.clickAction,
}));

const iconStyles = ({ theme }) => ({
  height: 35,
  width: 35,
  marginRight: 12,
  flexShrink: "0",
  backgroundColor: "rgb(249, 249, 249)",
  ...theme.message?.icon,
});

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
