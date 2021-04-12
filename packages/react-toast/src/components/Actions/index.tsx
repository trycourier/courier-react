import React from "react";
import { Container, Details, Dismiss } from "./styled";
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
    <Container theme={theme?.sidebar} data-testid="message-actions">
      {onClickDetails && (
        <Details
          href={href}
          onClick={onClickDetails}
          data-testid="message-action-details"
        >
          Details
        </Details>
      )}
      <Dismiss onClick={onClickDismiss} data-testid="message-action-dismiss">
        Dismiss
      </Dismiss>
    </Container>
  );
};

export default Actions;
