import React from "react";
import { Container, Button } from "./styled";
import { useToastConfig } from "../../hooks";

function SideBar({ open, dismiss, href }) {
  const {
    config: { theme },
  } = useToastConfig();

  return (
    <Container theme={theme?.sidebar} data-test-id="toast-sidebar">
      {open && (
        <Button
          theme={theme?.sidebar?.details}
          href={href}
          color="#9D3789"
          onClick={open}
          data-test-id="toast-sidebar-button-details"
        >
          Details
        </Button>
      )}
      <Button
        theme={theme?.sidebar?.dismiss}
        onClick={dismiss}
        data-test-id="toast-sidebar-button-dismiss"
      >
        Dismiss
      </Button>
    </Container>
  );
}

export default SideBar;
