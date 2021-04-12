import React, { useEffect } from "react";
import Messages from "../Messages";
import Bell from "./Bell";
import { InboxProps } from "../../types";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, StyledTippy } from "./styled";
import { getTippyProps, handleBellOnMouseEnter } from "./helpers";
import useInbox from "~/hooks/use-inbox";
import { useCourier } from "@trycourier/react-provider";

const Inbox: React.FunctionComponent<InboxProps> = (props) => {
  const { theme = {}, className, trigger, placement, title, tabs } = props;
  const tippyProps = getTippyProps({ trigger, placement });
  const courierContext = useCourier();
  const { unreadMessageCount, init: initialize } = useInbox();
  useEffect(() => {
    const { clientKey, userId } = courierContext;
    if (!courierContext) {
      throw new Error("Missing Courier Provider");
    } else if (courierContext?.inbox && clientKey && userId) {
      debugger;
      initialize({ clientKey, userId, title, tabs });
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledTippy {...tippyProps} content={<Messages {...props} />}>
        {props.renderIcon ? (
          <span>
            {props.renderIcon({
              hasUnreadMessages: Boolean(unreadMessageCount),
            })}
          </span>
        ) : (
          <Bell
            className={className}
            hasUnreadMessages={Boolean(unreadMessageCount)}
            onMouseEnter={handleBellOnMouseEnter}
          />
        )}
      </StyledTippy>
    </ThemeProvider>
  );
};

Inbox.defaultProps = {
  tabs: [
    {
      id: "unread",
      label: "Unread",
      filter: {
        isRead: false,
      },
    },
    {
      id: "all",
      label: "All Messages",
      filter: {},
    },
  ],
};

export default Inbox;
