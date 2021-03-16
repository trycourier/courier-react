import React, { useState, useEffect } from "react";
import Messages from "../Messages";
import Tippy, { TippyProps } from "@tippyjs/react";
import tippyCss from "tippy.js/dist/tippy.css";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Bell from "./Bell";
import { useCourier, useActions } from "@trycourier/react-provider";

import { InboxProps } from "../../types";
const GlobalStyle = createGlobalStyle`${tippyCss}`;

const StyledTippy = styled(Tippy)(({ theme }) => ({
  fontFamily: `"Nunito Sans", sans-serif`,
  background: "#f9fafb !important",
  backgroundColor: "#f9fafb !important",
  boxShadow: "0px 12px 32px rgba(86, 43, 85, 0.3)",
  color: "black !important",
  minWidth: 400,
  borderRadius: "20px !important",

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

  const courierActions = useActions();
  const [visible, setVisible] = useState(false);

  const handleBellOnClick = () => {
    setVisible(!visible);
  };

  let tippyProps: TippyProps = {
    placement: "right",
    interactive: true,
  };

  if (visible) {
    tippyProps = {
      ...tippyProps,
      visible,
    };
  }

  useEffect(() => {
    if (!courierActions) {
      return;
    }

    courierActions.initInbox({
      inboxConfig: props.config,
    });
  }, [props]);

  return (
    <ThemeProvider theme={props.theme ?? {}}>
      <GlobalStyle />
      <StyledTippy {...tippyProps} content={<Messages {...props} />}>
        {props.renderIcon ? (
          <span>{props.renderIcon({})}</span>
        ) : (
          <Bell onClick={handleBellOnClick} />
        )}
      </StyledTippy>
    </ThemeProvider>
  );
};

export default Inbox;
