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

const LoadingIndicator: React.FunctionComponent<{ width?: string }> = ({
  width = 48,
}) => {
  return (
    <Styled>
      <svg
        width={width}
        height={width}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1901_4203)">
          <path
            opacity="0.08"
            d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
          />
          <path d="M24 38C16.28 38 10 31.72 10 24C10 23.45 10.45 23 11 23C11.55 23 12 23.45 12 24C12 30.62 17.38 36 24 36C30.62 36 36 30.62 36 24C36 23.45 36.45 23 37 23C37.55 23 38 23.45 38 24C38 31.72 31.72 38 24 38Z" />
        </g>
        <defs>
          <clipPath id="clip0_1901_4203">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Styled>
  );
};

export default LoadingIndicator;
