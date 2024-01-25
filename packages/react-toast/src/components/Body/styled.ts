import styled from "styled-components";
import deepExtend from "deep-extend";
import { IActionElemental } from "@trycourier/react-provider";
import tinycolor2 from "tinycolor2";

export const iconStyles = ({ theme }) =>
  deepExtend(
    {
      flexShrink: "0",
      objectFit: "contain",
      alignSelf: "center",
      padding: "2px",
      maxHeight: "40px !important",
      maxWidth: "40px !important",
      path: {
        fill: theme?.brand?.colors?.primary,
      },
    },
    theme?.message?.icon
  );

export const Icon = styled.img(iconStyles);

export const Dismiss = styled.button(({ theme }) =>
  deepExtend(
    {
      opacity: 0,
      cursor: "pointer",
      position: "absolute",
      top: -15,
      fontFamily: `"Roboto", monospace`,
      right: -10,
      width: 25,
      height: 25,
      zIndex: 50,
      color: theme?.brand?.colors?.primary,
      background: "rgba(255, 255, 255, 0.8)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      transition: "opacity 100ms ease-in",
      padding: 3,
      border: "none",
      "&:hover": {
        background: "white",
      },

      borderRadius: "100%",
    },
    theme?.dismiss
  )
);

export const Container = styled.div`
  width: 100%;
  position: relative;

  &:hover ${Dismiss} {
    opacity: 1;
  }
`;

export const Message = styled.div(({ theme }) =>
  deepExtend(
    {
      padding: 12,
      paddingRight: 0,
      fontSize: "12px",
      fontStyle: "normal",
      lineHeight: "14px",
      alignSelf: "center",
      color: "var(--ci-text-color)",
      overflow: "hidden",
    },
    theme?.message?.contents
  )
);

export const Title = styled.div(({ theme }) =>
  deepExtend(
    {
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "19px",
      letterSpacing: "0em",
      textAlign: "left",
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitLineClamp: "1",
      WebkitBoxOrient: "vertical",
      color: "var(--ci-title-color)",
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
      fontWeight: "400",
      lineHeight: "16px",
      letterSpacing: "0em",
      textAlign: "left",
      whiteSpace: "pre-wrap",
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
  const primaryColor = backgroundColor ?? theme?.brand?.colors?.primary;
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
