import React from "react";
import styled from "styled-components";
import { COURIER_CLIENT_HEADER } from "../../constants";
import { Icon } from "./styled";
import CourierIcon from "./courier-icon.svg";

export function sendClickedRequest(clientKey, clickedUrl) {
  if (clientKey && clickedUrl) {
    fetch(`${clickedUrl}`, {
      method: "POST",
      headers: {
        [COURIER_CLIENT_HEADER]: clientKey,
      },
    });
  }
}

export function sendReadRequest(clientKey, readUrl) {
  if (clientKey && readUrl) {
    fetch(`${readUrl}`, {
      method: "POST",
      headers: {
        [COURIER_CLIENT_HEADER]: clientKey,
      },
    });
  }
}

export function getIcon(icon) {
  if (icon === false) {
    return;
  }

  if (typeof icon === "string") {
    // eslint-disable-next-line react/display-name
    return (props) => <Icon src={icon} {...props} />;
  }

  return styled(icon ?? CourierIcon)((props) => ({
    flexShrink: 0,
    marginLeft: 12,
    marginRight: 12,
    alignSelf: "center",
    maxHeight: "35px !important",
    maxWidth: "35px !important",
    ...props.theme,
  }));
}
