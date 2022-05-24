import React, { useMemo } from "react";
import deepExtend from "deep-extend";
import styled from "styled-components";
import {
  Icon,
  icons,
  Title,
  ActionBlock,
  TextBlock,
} from "@trycourier/react-shared";

export type StyledProps = {
  theme?: any;
  children?: React.ReactNode;
  [key: string]: any;
};

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

export const MessageTitle = ({ theme, children, ...props }: StyledProps) => (
  <Title css={theme?.message?.title} {...props}>
    {children}
  </Title>
);

export const MessageTextBlock = ({
  theme,
  children,
  ...props
}: StyledProps) => (
  <TextBlock css={theme?.message?.textBlock} {...props}>
    {children}
  </TextBlock>
);

export const MessageActionBlock = ({
  theme,
  children,
  ...props
}: StyledProps) => (
  <ActionBlock
    backgroundColor={theme?.brand?.colors?.primary}
    css={theme?.message?.actionBlock}
    {...props}
  >
    {children}
  </ActionBlock>
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

export const MessageIcon = ({ theme, ...props }: StyledProps) => (
  <Icon
    fill={theme?.brand?.colors?.primary}
    css={theme.message?.icon}
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
