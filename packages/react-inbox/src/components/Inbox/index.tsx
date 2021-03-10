import React, { useRef } from "react";
import { ThemeProvider } from "styled-components";
import Message from "../Message";
import { InboxProps } from "../../types";
import { useCloseOnClickOut } from "../../hooks";
import { Body, Container, Footer, Title, Header, SubTitle } from "./styled";

import CloseSvg from "./close.svg";
import CourierSvg from "./courier.svg";

function Inbox({
  closeOnClickOut,
  indicator,
  messages,
  onClose,
  onMessageClick,
  show: _show,
  title,
}: InboxProps) {
  const rootRef = useRef(null);
  const show = !indicator ? true : indicator && _show ? true : false;
  useCloseOnClickOut(
    rootRef.current,
    Boolean(show && closeOnClickOut),
    onClose
  );

  return (
    <Container data-test-id="inbox-container" ref={rootRef} show={show}>
      <Header>
        <Title>{title}</Title>
        <button onClick={onClose}>
          <CloseSvg />
        </button>
      </Header>
      <SubTitle>INBOX</SubTitle>
      <Body>
        {messages.map((message, index) => (
          <Message
            onClick={() => onMessageClick && onMessageClick(message)}
            key={index}
            {...message}
          />
        ))}
      </Body>
      <Footer>
        <CourierSvg />
      </Footer>
    </Container>
  );
}

function ThemeWrapper({ theme = {}, ...props }: InboxProps) {
  return (
    <ThemeProvider theme={theme}>
      <Inbox {...props} />
    </ThemeProvider>
  );
}

export default ThemeWrapper;
