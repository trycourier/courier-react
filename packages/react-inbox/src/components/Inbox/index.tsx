import React, { useEffect } from "react";
import Messages from "../Messages";
import Tippy, { TippyProps } from "@tippyjs/react";
import tippyCss from "tippy.js/dist/tippy.css";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Bell from "./Bell";
import { useCourier, registerReducer } from "@trycourier/react-provider";

import useInbox from "~/hooks/use-inbox";

import { InboxProps } from "../../types";
import reducer from "~/reducer";

const GlobalStyle = createGlobalStyle`${tippyCss}`;

const StyledTippy = styled(Tippy)(({ theme }) => ({
  fontFamily: `"Nunito Sans", sans-serif`,
  background: "#f9fafb !important",
  backgroundColor: "#f9fafb !important",
  boxShadow: "0px 12px 32px rgba(86, 43, 85, 0.3)",
  color: "black !important",
  minWidth: 400,
  borderRadius: "20px !important",
  "*": {
    boxSizing: "border-box",
  },

  ".tippy-content": {
    padding: 0,
  },

  ".tippy-arrow": {
    color: "#f9fafb",
  },

  ...theme.root,
}));

const Inbox: React.FunctionComponent<InboxProps> = (props) => {
  const courierContext = useCourier();

  if (!courierContext) {
    throw new Error("Missing Courier Provider");
  }

  const inbox = useInbox();

  let tippyProps: TippyProps = {
    trigger: props.trigger ?? "click",
    placement: props.placement ?? "right",
    interactive: true,
  };

  useEffect(() => {
    registerReducer("inbox", reducer);
  }, []);

  useEffect(() => {
    inbox.init({
      config: props.config,
    });
  }, [props]);

  if (!courierContext?.inbox) {
    return null;
  }

  return (
    <ThemeProvider theme={props.theme ?? {}}>
      <GlobalStyle />
      <StyledTippy {...tippyProps} content={<Messages {...props} />}>
        {props.renderIcon ? (
          <span>{props.renderIcon({})}</span>
        ) : (
          <Bell className={props.className} />
        )}
      </StyledTippy>
    </ThemeProvider>
  );
};

export default Inbox;
