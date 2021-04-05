import React from "react";
import styled from "styled-components";
import CourierIcon from "~/assets/courier_icon.svg";
import { Icon } from "./styled";

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
