import React from "react";

import { useInbox } from "@trycourier/react-hooks";

import { InboxProps } from "../../types";

import styled from "styled-components";
import deepExtend from "deep-extend";

const Empty = styled.div(({ theme }) =>
  deepExtend(
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "16px",

      flexDirection: "column",
      background: "white",
      width: "100%",

      color: theme?.brand?.inapp?.emptyState?.textColor ?? "#566074",
      margin: "auto",
      svg: {
        path: {
          fill: theme.brand?.colors?.primary,
        },
      },
      div: {
        paddingTop: 10,
      },
    },
    theme?.emptyState
  )
);

const NoMessages: React.FunctionComponent<{
  labels: InboxProps["labels"];
}> = ({ labels }) => {
  const { brand } = useInbox();

  return (
    <Empty>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1901_4218)">
          <path
            opacity="0.08"
            d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
          />
          <path d="M24 38C16.28 38 10 31.72 10 24C10 23.45 10.45 23 11 23C11.55 23 12 23.45 12 24C12 30.62 17.38 36 24 36C30.62 36 36 30.62 36 24C36 23.45 36.45 23 37 23C37.55 23 38 23.45 38 24C38 31.72 31.72 38 24 38Z" />
          <path d="M19 22C20.1046 22 21 20.6569 21 19C21 17.3431 20.1046 16 19 16C17.8954 16 17 17.3431 17 19C17 20.6569 17.8954 22 19 22Z" />
          <path d="M29 22C30.1046 22 31 20.6569 31 19C31 17.3431 30.1046 16 29 16C27.8954 16 27 17.3431 27 19C27 20.6569 27.8954 22 29 22Z" />
        </g>
        <defs>
          <clipPath id="clip0_1901_4218">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div>
        {labels?.emptyState ??
          brand?.inapp?.emptyState?.text ??
          "You’re all caught up"}
      </div>
    </Empty>
  );
};

export default NoMessages;
