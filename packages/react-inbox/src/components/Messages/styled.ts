import styled from "styled-components";
import deepExtend from "deep-extend";

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

export const DismissInbox = styled.button(({ theme }) =>
  deepExtend(
    {
      border: "none",
      borderRadius: "50%",
      position: "absolute",
      top: 6,
      right: 8,
      cursor: "pointer",
      width: 42,
      height: 42,
      background: "rgba(115, 129, 155, 0.6)",
      color: "white",
      transition: "background 100ms ease-in",

      "&:hover": {
        background: "rgba(115, 129, 155, 0.8)",
      },
    },
    theme?.dismissInbox
  )
);

export const MessageListContainer = styled.div<{ isMobile?: boolean }>(
  ({ theme }) =>
    deepExtend(
      {
        background:
          theme.brand?.inapp?.widgetBackground?.topColor &&
          theme.brand?.inapp?.widgetBackground?.bottomColor
            ? `linear-gradient(180deg, ${theme.brand?.inapp?.widgetBackground?.topColor} 0%, ${theme.brand?.inapp?.widgetBackground?.bottomColor} 100%)`
            : theme.brand?.colors?.secondary ?? "#9121c2",
        padding: 17,
        paddingBottom: 0,
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
        overflow: "scroll",
        display: "flex",
        height,
        maxHeight: height,
        flexDirection: "column",
        borderTop: "1px solid rgba(203,213,224,.5)",
        scrollSnapType: "y proximity",
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

export const MarkAllAsRead = styled.a`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  color: #9121c2;
`;

export const Empty = styled.div(({ theme }) =>
  deepExtend(
    {
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "25px",
      letterSpacing: "0em",
      textAlign: "center",
      color: theme?.brand?.inapp?.emptyState?.textColor ?? "white",
      margin: "auto",
    },
    theme?.emptyState
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
