import React, { useMemo } from "react";
import deepExtend from "deep-extend";
import styled from "styled-components";
import CourierSvg from "~/assets/courier_icon.svg";
import CourierBigSvg from "~/assets/courier_big_icon.svg";
import tinycolor2 from "tinycolor2";
import { IActionElemental } from "@trycourier/core";

export const PositionRelative = styled.div`
  position: relative;
`;

export const Title = styled.div<{ read?: string }>(({ theme, read }) =>
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
      color: read ? "var(--ci-text-color)" : "var(--ci-title-color)",
    },
    theme.message?.title
  )
);

export const TextElement = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "var(--ci-text-color)",
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
      whiteSpace: "pre-line",
      p: {
        margin: 0,
      },
    },
    theme.message?.textElement
  )
);

export const ActionElement = styled.button<{
  primary?: boolean;
  backgroundColor: IActionElemental["background_color"];
}>(({ theme, primary, backgroundColor }) => {
  const primaryColor =
    backgroundColor ?? theme?.brand?.colors?.primary ?? "#9121c2";
  const tcPrimaryColor = tinycolor2(primaryColor);

  return deepExtend(
    {
      borderRadius: 6,
      color: primary ? "white" : "rgba(28, 39, 58, 1)",
      background: primary ? primaryColor : "white",
      wordBreak: "break-word",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "16px",
      height: "24px",
      padding: "0 16px",
      cursor: "pointer",
      border: `1px solid ${primary ? "transparent" : "rgba(28, 39, 58, 1)"}`,
      marginRight: "12px",
      marginTop: "6px",
      transition: "all 100ms ease-in",
      "&:hover": {
        color: "white",
        background: primary
          ? tcPrimaryColor.lighten(10)
          : "rgba(28, 39, 58, 1)",
      },
    },
    theme.message?.actionElement
  );
});

export const TimeAgo = styled.div(({ theme }) =>
  deepExtend(
    {
      color: "var(--ci-text-color)",
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

export const ResponsiveContainer = styled.div<{ isMobile?: boolean }>(
  ({ theme, isMobile }) =>
    deepExtend(
      {
        ...(isMobile
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            }
          : {}),
      },
      theme?.container
    )
);

export const MessageList = styled.div<{ isMobile?: boolean }>(
  ({ isMobile, theme }) => {
    const defaultHeight = 392;

    const height = (() => {
      if (!isMobile) {
        return defaultHeight;
      }

      return `Calc(100vh - 205px)`;
    })();

    return deepExtend(
      {
        background: "rgba(255, 255, 255, 0.2)",
        overflow: "auto",
        display: "flex",
        height,
        maxHeight: height,
        flexDirection: "column",
        borderTop: "1px solid rgba(203,213,224,.5)",
      },
      theme?.messageList?.container
    );
  }
);

export const Header = styled.div(({ theme }) =>
  deepExtend(
    {
      padding: "18px 20px 12px 20px",
      userSelect: "none",
      display: "flex",
      color: "#24324b",
      justifyContent: "space-between",
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "25px",
    },
    theme?.header
  )
);

export const Footer = styled.div(({ theme }) =>
  deepExtend(
    {
      alignItems: "center",
      background: "white",
      display: "flex",
      fontSize: "10px",
      fontStyle: "normal",
      letterSpacing: ".1rem",
      position: "relative",
      zIndex: 1,
      boxShadow: "0 14px 11px 18px #3445632e",
      fontWeight: "700",
      height: 45,
      justifyContent: "center",
      paddingRight: 18,
      svg: {
        marginTop: 2,
        marginLeft: -1,
      },

      a: {
        display: "inherit",
        color: "#B9C0CD",
      },
    },
    theme?.footer
  )
);

export const Line = styled.div(({ theme }) => ({
  backgroundColor: theme?.brand?.colors?.primary ?? "#9121c2",
  height: "4px",
  flex: 1,
  opacity: "0.18",
  ":first-child": {
    marginRight: "15px",
  },
  ":last-child": {
    marginLeft: "15px",
  },
}));
