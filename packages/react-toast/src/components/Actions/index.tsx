import React from "react";
import { Container, Button } from "./styled";
import { useToast } from "../../hooks";

const Actions: React.FunctionComponent<{
  onClickDetails?: (event: React.MouseEvent) => void;
  onClickDismiss?: (event: React.MouseEvent) => void;
  href?: string;
}> = ({ onClickDetails, onClickDismiss, href }) => {
  const [
    ,
    {
      config: { theme },
    },
  ] = useToast();

  return (
    <Container theme={theme?.sidebar} data-test-id="toast-sidebar">
      {onClickDetails && (
        <Button
          href={href}
          color="#9D3789"
          onClick={onClickDetails}
          data-test-id="toast-sidebar-button-details"
        >
          Details
        </Button>
      )}
      <Button
        onClick={onClickDismiss}
        data-test-id="toast-sidebar-button-dismiss"
      >
        Dismiss
      </Button>
    </Container>
  );
};

export default Actions;
