import React from "react";
import styled from "styled-components";
import tinycolor2 from "tinycolor2";
import StyledTippy from "../../StyledTippy";

const StyledButton = styled.button(({ theme }) => {
  const primaryColor = theme.brand?.colors?.primary;
  const tcPrimaryColor = tinycolor2(primaryColor);

  return {
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderRadius: "6px",
    padding: 0,
    marginTop: -3,
    height: "24px",
    width: "24px",
    opacity: 1,
    transition: "background 200ms ease-in-out",

    "&:hover": {
      background: tcPrimaryColor.setAlpha(0.14),
    },
  };
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
  onClick: React.MouseEventHandler;
}> = ({ onClick }) => {
  return (
    <StyledTippy content="Mark as Read">
      <StyledButton onClick={onClick}>
        <Checkmark />
      </StyledButton>
    </StyledTippy>
  );
};

export default MarkRead;
