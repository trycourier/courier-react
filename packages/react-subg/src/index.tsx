import React, { useEffect, useMemo, useState } from "react";
import { useSinceYouBeenGone, useInbox } from "@trycourier/react-hooks";
import { useIdleTimer } from "react-idle-timer/dist/index.legacy.cjs.js";
import { Modal, Message } from "@trycourier/react-elements";
import styled, { ThemeProps, ThemeProvider } from "styled-components";
import deepExtend from "deep-extend";
import { SFImage } from "./bg";
import CourierLogo from "~/assets/courier-text-logo2.svg";

const Styled = styled.div`
  color: rgb(28, 39, 58);
  text-align: center;
  padding: 10px 20px;
  padding-bottom: 0;

  p {
    text-align: left;
  }
  .messages {
    max-height: 300px;
    overflow: auto;
    margin-top: 6px;
  }

  h1 {
    color: rgb(28, 39, 58);
    margin: 0;
  }
`;

export const Footer = styled.div(({ theme }) =>
  deepExtend(
    {
      alignItems: "center",
      background: "white",
      display: "flex",
      fontSize: "10px",
      fontStyle: "normal",
      position: "relative",
      zIndex: 1,
      fontWeight: "700",
      lineHeight: "14px",
      letterSpacing: "0.1rem",
      height: 36,
      justifyContent: "center",
      paddingRight: 18,
      svg: {
        marginLeft: -3,
        marginTop: -4,
      },

      a: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "rgba(86, 96, 116, 0.8)",
      },
    },
    theme?.footer
  )
);

const SinceYouBeenGone: React.FunctionComponent<{
  timeout: number;
  theme?: ThemeProps<Record<string, unknown>>;
}> = (props) => {
  const timeout = props.timeout ?? 30000;
  const subg = useSinceYouBeenGone();
  const inbox = useInbox();
  const [focusedMessageId, setFocusedMessageId] = useState<string>("");
  const [showSUBG, setShowSUBG] = useState<boolean>(false);

  const onActive = () => {
    if (showSUBG) {
      return;
    }

    subg.setLastActive();
  };

  useIdleTimer({
    onActive,
    timeout: 30000,
    throttle: 500,
  });

  useEffect(() => {
    subg.setLastActive();
  }, []);

  useEffect(() => {
    if (subg.sinceYouBeenGone > timeout) {
      setShowSUBG(true);
      inbox.fetchMessages();
    }
  }, [timeout, subg.sinceYouBeenGone]);

  const messagesSUBG = useMemo(() => {
    return [...(inbox.pinned ?? []), ...(inbox.messages ?? [])].filter((m) => {
      const created = new Date(m.created).getTime();
      const previousLastActive = new Date(subg.previousLastActive).getTime();
      return created > previousLastActive;
    });
  }, [inbox.messages, inbox.pinned, subg.previousLastActive]);

  useEffect(() => {
    if (messagesSUBG.length === 0 && showSUBG) {
      setShowSUBG(false);
    }
  }, [showSUBG, messagesSUBG.length]);

  return (
    <ThemeProvider
      theme={deepExtend({}, props.theme ?? {}, {
        brand: inbox.brand,
      })}
    >
      <Modal
        isOpen={showSUBG && messagesSUBG?.length > 0}
        onClose={() => setShowSUBG(false)}
      >
        <Styled>
          <SFImage />
          <p>
            <h1>Welcome back!</h1>
            Here is a summary of the messages that arrived since you been gone:
          </p>
          <div className="messages">
            {messagesSUBG?.map((m) => (
              <Message
                {...m}
                key={m.messageId}
                isMessageFocused={focusedMessageId === m.messageId}
                setFocusedMessageId={setFocusedMessageId}
              />
            ))}
          </div>
          <Footer>
            <a href="https://www.courier.com">
              POWERED BY&nbsp;&nbsp;
              <CourierLogo />
            </a>
          </Footer>
        </Styled>
      </Modal>
    </ThemeProvider>
  );
};

export default SinceYouBeenGone;
