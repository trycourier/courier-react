import React from "react";
import { Root, Container, Title, Body, Icon, ReadIndicator } from "./styled";

interface MessageProps {
  title: string;
  body: string;
  icon?: string;
  onClick: (event: React.MouseEvent) => void;
  read?: boolean;
}

function Message({ title, body, icon, onClick, read }: MessageProps) {
  return (
    <Root data-test-id="inbox-message" read={read} onClick={onClick}>
      {read && <ReadIndicator />}
      <Icon src={icon} />
      <Container>
        <Title>{title}</Title>
        <Body>{body}</Body>
      </Container>
    </Root>
  );
}

export default Message;
