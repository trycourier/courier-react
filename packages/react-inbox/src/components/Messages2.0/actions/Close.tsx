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
    height: "24px",
    transition: "background 200ms ease-in-out",

    "&:hover": {
      background: tcPrimaryColor.setAlpha(0.14),
    },
  };
});

const CloseAction: React.FunctionComponent<{
  onClick: React.MouseEventHandler;
  tooltip: string;
  size?: "small";
  title?: string;
}> = ({ onClick, tooltip, size, title }) => {
  return (
    <StyledTippy content={tooltip}>
      <StyledButton
        title={title ?? "close inbox"}
        className="close"
        onClick={onClick}
      >
        {size === "small" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.71 8.29C15.32 7.9 14.69 7.9 14.3 8.29L12.36 10.23C12.16 10.43 11.85 10.43 11.65 10.23L9.71001 8.29C9.32001 7.9 8.69001 7.9 8.30001 8.29C7.91001 8.68 7.91001 9.31 8.30001 9.7L10.24 11.64C10.44 11.84 10.44 12.15 10.24 12.35L8.30001 14.29C7.91001 14.68 7.91001 15.31 8.30001 15.7C8.69001 16.09 9.32001 16.09 9.71001 15.7L11.65 13.76C11.85 13.56 12.16 13.56 12.36 13.76L14.3 15.7C14.69 16.09 15.32 16.09 15.71 15.7C16.1 15.31 16.1 14.68 15.71 14.29L13.77 12.35C13.57 12.15 13.57 11.84 13.77 11.64L15.71 9.7C16.1 9.31 16.1 8.68 15.71 8.29V8.29Z"
              fill="#566074"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.71 6.29006C17.32 5.90006 16.69 5.90006 16.3 6.29006L12.36 10.2301C12.16 10.4301 11.85 10.4301 11.65 10.2301L7.71001 6.29006C7.32001 5.90006 6.69001 5.90006 6.30001 6.29006C5.91001 6.68006 5.91001 7.31006 6.30001 7.70006L10.24 11.6401C10.44 11.8401 10.44 12.1501 10.24 12.3501L6.30001 16.2901C5.91001 16.6801 5.91001 17.3101 6.30001 17.7001C6.69001 18.0901 7.32001 18.0901 7.71001 17.7001L11.65 13.7601C11.85 13.5601 12.16 13.5601 12.36 13.7601L16.3 17.7001C16.69 18.0901 17.32 18.0901 17.71 17.7001C18.1 17.3101 18.1 16.6801 17.71 16.2901L13.77 12.3501C13.57 12.1501 13.57 11.8401 13.77 11.6401L17.71 7.70006C18.1 7.31006 18.1 6.68006 17.71 6.29006Z"
              fill="#566074"
            />
          </svg>
        )}
      </StyledButton>
    </StyledTippy>
  );
};

export default CloseAction;
