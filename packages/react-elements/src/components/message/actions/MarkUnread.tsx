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

const MarkUnread: React.FunctionComponent<{
  label?: string;
  onClick: React.MouseEventHandler;
}> = ({ onClick, label }) => {
  return (
    <StyledTippy content={label}>
      <StyledButton title={label} onClick={onClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 5H18C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9H20C21.1046 9 22 8.10457 22 7C22 5.89543 21.1046 5 20 5Z"
            fill="#566074"
          />
          <path
            d="M19 10C18.45 10 18 10.45 18 11V14.5C18 14.78 17.78 15 17.5 15H6.5C6.22 15 6 14.78 6 14.5V10.3C6 10.3 6.04 10.24 6.08 10.26L11.45 13.84C11.62 13.95 11.81 14.01 12 14.01C12.19 14.01 12.39 13.95 12.55 13.84L16.46 11.23C16.92 10.92 17.04 10.3 16.74 9.84C16.43 9.38 15.81 9.26 15.35 9.56L12.27 11.61C12.1 11.72 11.88 11.72 11.72 11.61L7.94 9.09C7.94 9.09 7.92 9 7.97 9H14C14.55 9 15 8.55 15 8C15 7.45 14.55 7 14 7H6C4.9 7 4 7.9 4 9V15C4 16.1 4.9 17 6 17H18C19.1 17 20 16.1 20 15V11C20 10.45 19.55 10 19 10Z"
            fill="#566074"
          />
        </svg>
      </StyledButton>
    </StyledTippy>
  );
};

export default MarkUnread;
