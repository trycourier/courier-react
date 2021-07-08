import styled from "styled-components";
import deepExtend from "deep-extend";

export const Container = styled.div(({ theme }) =>
  deepExtend(
    {
      background:
        theme.brand.inapp?.widgetBackground?.topColor &&
        theme.brand.inapp?.widgetBackground?.bottomColor
          ? `linear-gradient(180deg, ${theme.brand.inapp?.widgetBackground?.topColor} 0%, ${theme.brand.inapp.widgetBackground.bottomColor} 100%)`
          : theme.brand.colors.secondary,
      padding: 17,
      paddingBottom: 0,
    },
    theme?.container
  )
);

export const MessageList = styled.div(({ theme }) =>
  deepExtend(
    {
      background: "rgba(255, 255, 255, 0.2)",
      overflow: "scroll",
      display: "flex",
      height: 392,
      maxHeight: 392,
      flexDirection: "column",
      borderTop: "1px solid rgba(203,213,224,.5)",
      scrollSnapType: "y proximity",
    },
    theme?.messageList?.container
  )
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
    theme.header
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

export const Empty = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  color: "white";
  margin: auto;
`;

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
    theme.footer
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
