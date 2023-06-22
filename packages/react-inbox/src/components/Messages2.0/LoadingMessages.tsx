import React from "react";
import styled from "styled-components";
import deepExtend from "deep-extend";
import { useInbox } from "@trycourier/react-hooks";

import { InboxProps } from "../../types";

import LoadingIndicator from "./LoadingIndicator";

const Styled = styled.div(({ theme }) =>
  deepExtend(
    {
      width: "100%",
      height: "100%",
      background: "white",
      fontSize: 14,
      fontWeight: 600,
      color: theme?.brand?.inapp?.emptyState?.textColor ?? "inherit",
    },
    theme?.emptyState
  )
);

const LoadingMessages: React.FunctionComponent<{
  labels: InboxProps["labels"];
  noResults: boolean;
}> = ({ labels, noResults }) => {
  const { brand } = useInbox();

  return (
    <Styled>
      <LoadingIndicator finished={noResults}>
        {labels?.emptyState ??
          brand?.inapp?.emptyState?.text ??
          "You’re all caught up"}
      </LoadingIndicator>
    </Styled>
  );
};

export default LoadingMessages;
