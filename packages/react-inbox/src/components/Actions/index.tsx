import React from "react";
import { Action, Container } from "./styled";

function Actions({ actions }) {
  return (
    <Container>
      {actions.map(({ label, href, onClick, openInNewTab = true }) => (
        <Action
          key="label"
          target={openInNewTab ? "_blank" : ""}
          as={href ? "a" : "div"}
          href={href}
          onClick={href ? undefined : onClick}
        >
          {label}
        </Action>
      ))}
    </Container>
  );
}

export default Actions;
