import React from "react";
import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const styles = css`
  animation: ${spin} 1s linear infinite;
`;

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  svg {
    ${styles}

    path {
      fill: ${({ theme }) => {
        return theme.brand?.colors?.primary;
      }};
    }
  }
`;

const LoadingIndicator: React.FunctionComponent = () => {
  return (
    <Styled>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1901_3938)">
          <path
            opacity="0.08"
            d="M17 29C23.6274 29 29 23.6274 29 17C29 10.3726 23.6274 5 17 5C10.3726 5 5 10.3726 5 17C5 23.6274 10.3726 29 17 29Z"
          />
          <path d="M10.9378 20.4999C9.00779 17.1571 10.1571 12.8677 13.5 10.9377C13.7381 10.8002 14.0455 10.8826 14.183 11.1208C14.3205 11.3589 14.2381 11.6663 14 11.8038C11.1334 13.4588 10.1488 17.1334 11.8038 19.9999C13.4588 22.8665 17.1334 23.8511 20 22.1961C20.2381 22.0586 20.5455 22.1409 20.683 22.3791C20.8205 22.6172 20.7381 22.9246 20.5 23.0621C17.1571 24.9921 12.8678 23.8428 10.9378 20.4999Z" />
        </g>
        <defs>
          <clipPath id="clip0_1901_3938">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(21.3923 0.607666) rotate(60)"
            />
          </clipPath>
        </defs>
      </svg>
    </Styled>
  );
};

export default LoadingIndicator;
