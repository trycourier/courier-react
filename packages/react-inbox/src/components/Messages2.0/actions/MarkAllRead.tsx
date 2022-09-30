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
    marginRight: "6px",
    height: "24px",

    path: {
      fill: theme?.brand?.colors?.primary,
    },

    "&:hover": {
      backgroundImage: `linear-gradient(180deg, ${tcPrimaryColor.setAlpha(
        0.2
      )} 0%, ${tcPrimaryColor.setAlpha(0.2)} 0.01%, ${tcPrimaryColor.setAlpha(
        0.08
      )} 100%);`,
    },
  };
});

const MarkAllRead: React.FunctionComponent<{
  onClick: React.MouseEventHandler;
}> = ({ onClick }) => {
  return (
    <StyledTippy content={"Mark All as Read"}>
      <StyledButton onClick={onClick}>
        <div id="arrow" data-popper-arrow></div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.7 4.54995C16.31 4.15995 15.68 4.15995 15.29 4.54995L10.86 8.97995C10.66 9.17995 10.35 9.17995 10.15 8.97995L8.72 7.54995C8.33 7.15995 7.7 7.15995 7.31 7.54995C6.92 7.93995 6.92 8.56995 7.31 8.95995L9.8 11.4599C10.19 11.8499 10.82 11.8499 11.21 11.4599L16.7 5.96995C17.09 5.57995 17.09 4.94995 16.7 4.55995V4.54995Z" />
          <path d="M10.15 16.98L8.72 15.55C8.33 15.16 7.7 15.16 7.31 15.55C6.92 15.94 6.92 16.57 7.31 16.96L9.8 19.46C10.19 19.85 10.82 19.85 11.21 19.46L16.7 13.97C17.09 13.58 17.09 12.95 16.7 12.56C16.31 12.17 15.68 12.17 15.29 12.56L10.86 16.99C10.66 17.19 10.35 17.19 10.15 16.99V16.98Z" />
        </svg>
      </StyledButton>
    </StyledTippy>
  );
};

export default MarkAllRead;
