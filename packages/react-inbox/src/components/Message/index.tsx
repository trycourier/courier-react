import React from "react";
import { Container, Title, Body, Icon } from "./styled";

interface MessageProps {
  title: string;
  body: string;
  icon?: string;
  data?: {
    clickAction: string;
  };
}

function Message({ title, body, icon, data }: MessageProps) {
  return (
    <Container data-test-id="inbox-message">
      <Icon src={icon} />
      <div>
        <Title>{title}</Title>
        <Body>{body}</Body>
      </div>
      {data?.clickAction && <button>View Details</button>}
    </Container>
  );
}

export default Message;
