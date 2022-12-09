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
    },
    theme?.emptyState
  )
);

const StyledLabel = styled.div`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.theme?.brand?.inapp?.emptyState?.textColor ?? "#1C273A"};
`;

const LoadingMessages: React.FunctionComponent<{
  labels: InboxProps["labels"];
  noResults: boolean;
}> = ({ labels, noResults }) => {
  const { brand } = useInbox();

  return (
    <Styled>
      <LoadingIndicator finished={noResults}>
        <StyledLabel>
          {labels?.emptyState ??
            brand?.inapp?.emptyState?.text ??
            "You’re all caught up"}
        </StyledLabel>
      </LoadingIndicator>
    </Styled>
  );
};

export default LoadingMessages;
