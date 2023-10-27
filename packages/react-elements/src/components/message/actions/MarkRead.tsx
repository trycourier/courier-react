import deepExtend from "deep-extend";
import React from "react";
import styled from "styled-components";
import StyledTippy from "~/components/tooltip";

import { getStyles } from "./styles";

const StyledButton = styled.button(({ theme }) => {
  return deepExtend(
    {},
    getStyles(theme),
    {
      marginTop: -3,
    },
    theme.action
  );
});

export const Checkmark: React.FunctionComponent<{
  fill?: string;
  style?: React.CSSProperties;
}> = ({ fill = "#566074", style }) => (
  <svg
    fill="none"
    height="24"
    style={style}
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6825 8.2925C16.2925 7.9025 15.6625 7.9025 15.2725 8.2925L10.8425 12.7225C10.6425 12.9225 10.3325 12.9225 10.1325 12.7225L8.7025 11.2925C8.3125 10.9025 7.6825 10.9025 7.2925 11.2925C6.9025 11.6825 6.9025 12.3125 7.2925 12.7025L9.7825 15.2025C10.1725 15.5925 10.8025 15.5925 11.1925 15.2025L16.6825 9.7125C17.0725 9.3225 17.0725 8.6925 16.6825 8.3025V8.2925Z"
      fill={fill}
    />
  </svg>
);

const MarkRead: React.FunctionComponent<{
  label?: string;
  onClick: React.MouseEventHandler;
}> = ({ onClick, label }) => {
  return (
    <StyledTippy content={label}>
      <StyledButton title={label} onClick={onClick}>
        <Checkmark />
      </StyledButton>
    </StyledTippy>
  );
};

export default MarkRead;
