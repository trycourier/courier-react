import React from "react";
import styled from "styled-components";

import LoadingIndicator from "./LoadingIndicator";

const Styled = styled.div`
  padding: 12px 0;
`;

const StyledLabel = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) =>
    props.theme?.brand?.inapp?.emptyState?.textColor || "#566074"};
`;

const LoadingMore: React.FunctionComponent<{ noResults: boolean }> = ({
  noResults,
}) => {
  return (
    <Styled>
      <LoadingIndicator size={34} finished={noResults}>
        <StyledLabel>You have no more messages</StyledLabel>
      </LoadingIndicator>
    </Styled>
  );
};

export default LoadingMore;
