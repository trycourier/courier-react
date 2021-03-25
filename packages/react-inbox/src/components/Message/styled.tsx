import React, { useMemo } from "react";
import styled from "styled-components";
import CourierSvg from "./courier-icon.svg";

export const Container = styled.div(({ theme }) => ({
  display: "flex",
  // width: "100%",
  position: "relative",
  margin: "10px 0",
  padding: "10px 15px",
  backgroundColor: '#F9FAFB',
  alignItems: 'center',
  height: 90,
  borderRadius: 4,
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

export const Contents = styled.div(({ theme }) => ({
  marginRight: 'auto',
  maxWidth: "58%",
  ...theme.message?.contents,
}));

export const Title = styled.div(({ theme }) => ({
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
  ...theme.message?.title,
}));

export const Body = styled.div(({ theme }) => ({
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
  ...theme.message?.body,
}));

export const TimeAgo = styled.div(({ theme }) => ({
  color: "#aaa",
  marginTop: "2px",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "14px",
  letterSpacing: "0em",
  textAlign: "left",
  ...theme.message?.timeAgo,
}));

const iconStyles = ({ theme }) => ({
  height: 25,
  width: 25,
  marginRight: 18,
  flexShrink: "0",
  backgroundColor: "rgb(249, 249, 249)",
  ...theme.message?.icon,
});

export const UnreadMarker = styled.div`
  height: 36px;
  background-color: #9D3789;
  width: 5px;
`;

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