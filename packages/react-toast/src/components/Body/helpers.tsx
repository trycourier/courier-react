import React from "react";
import styled from "styled-components";
import CourierIcon from "~/assets/courier_icon.svg";
import { Icon, iconStyles } from "./styled";

const StyledIcon = styled(CourierIcon)(iconStyles);

export function getIcon(icon) {
  if (icon === false) {
    return;
  }

  if (icon && typeof icon === "string") {
    // eslint-disable-next-line react/display-name
    return (props) => <Icon src={icon} {...props} />;
  }

  return StyledIcon;
}
