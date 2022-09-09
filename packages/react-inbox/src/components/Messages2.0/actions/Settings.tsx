import React from "react";
import styled from "styled-components";

const StyledButton = styled.button(({ theme }) => ({
  cursor: "pointer",
  border: "none",
  background: "transparent",
  path: {
    fill: theme?.brand?.colors?.primary,
  },

  "&:hover": {
    backgroundImage: `linear-gradient(180deg, ${theme?.brand?.colors?.primary}, 10%, transparent 100%)`,
  },
}));

const Settings: React.FunctionComponent<{
  onClick: React.MouseEventHandler;
}> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6C20 5.45 19.55 5 19 5H10V7H19C19.55 7 20 6.55 20 6Z"
          fill="#2196F3"
        />
        <path
          d="M19 11H17V13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
          fill="#2196F3"
        />
        <path
          d="M8 3.5C7.45 3.5 7 3.95 7 4.5V5H5C4.45 5 4 5.45 4 6C4 6.55 4.45 7 5 7H7V7.5C7 8.05 7.45 8.5 8 8.5C8.55 8.5 9 8.05 9 7.5V4.5C9 3.95 8.55 3.5 8 3.5Z"
          fill="#2196F3"
        />
        <path
          d="M20 18C20 17.45 19.55 17 19 17H10V19H19C19.55 19 20 18.55 20 18Z"
          fill="#2196F3"
        />
        <path
          d="M8 15.5C7.45 15.5 7 15.95 7 16.5V17H5C4.45 17 4 17.45 4 18C4 18.55 4.45 19 5 19H7V19.5C7 20.05 7.45 20.5 8 20.5C8.55 20.5 9 20.05 9 19.5V16.5C9 15.95 8.55 15.5 8 15.5Z"
          fill="#2196F3"
        />
        <path
          d="M15 9.5C14.45 9.5 14 9.95 14 10.5V11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13H14V13.5C14 14.05 14.45 14.5 15 14.5C15.55 14.5 16 14.05 16 13.5V10.5C16 9.95 15.55 9.5 15 9.5Z"
          fill="#2196F3"
        />
      </svg>
    </StyledButton>
  );
};

export default Settings;
