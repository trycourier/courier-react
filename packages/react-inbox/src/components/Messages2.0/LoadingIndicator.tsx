import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Styled = styled.div<{ showSmiley: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  svg {
    animation: ${spin} 700ms
      ${(props) => (props.showSmiley ? "ease-out" : "linear infinite")};

    path {
      fill: ${(props) => props.theme.brand?.colors?.primary || "#9121C2"};

      &.eye {
        transition: 300ms ease-in-out;
        opacity: ${(props) => (props.showSmiley ? 1 : 0)};
        transform: scaleY(${(props) => (props.showSmiley ? 1 : 0)}) fill-box;
      }
    }
  }
`;

const StyledContent = styled.div<{ showSmiley: boolean }>`
  transition: 450ms 200ms ease-in-out;
  opacity: ${(props) => (props.showSmiley ? 1 : 0)};
  visibility: ${(props) => (props.showSmiley ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.showSmiley ? 0 : "25%")});
  text-align: center;
  padding: ${(props) => (props.showSmiley ? "6px" : 0)};
`;

const LoadingIndicator: React.FunctionComponent<{
  size?: number;
  finished?: boolean;
  children?: React.ReactNode;
}> = ({ size = 48, finished, children }) => {
  const [showSmiley, setShowSmiley] = useState(false);

  const handleShowSmiley = useCallback(() => setShowSmiley(true), []);

  useEffect(() => {
    if (!finished && showSmiley) {
      setShowSmiley(false);
    }
  }, [showSmiley, finished]);

  return (
    <Styled showSmiley={showSmiley}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onAnimationIteration={finished ? handleShowSmiley : undefined}
      >
        <g clipPath="url(#clip0_1901_4203)">
          <path
            d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
            opacity="0.08"
          />
          <path d="M24 38C16.28 38 10 31.72 10 24C10 23.45 10.45 23 11 23C11.55 23 12 23.45 12 24C12 30.62 17.38 36 24 36C30.62 36 36 30.62 36 24C36 23.45 36.45 23 37 23C37.55 23 38 23.45 38 24C38 31.72 31.72 38 24 38Z" />
          <path
            d="M19 22C20.1046 22 21 20.6569 21 19C21 17.3431 20.1046 16 19 16C17.8954 16 17 17.3431 17 19C17 20.6569 17.8954 22 19 22Z"
            className="eye"
          />
          <path
            d="M29 22C30.1046 22 31 20.6569 31 19C31 17.3431 30.1046 16 29 16C27.8954 16 27 17.3431 27 19C27 20.6569 27.8954 22 29 22Z"
            className="eye"
          />
        </g>
        <defs>
          <clipPath id="clip0_1901_4203">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <StyledContent showSmiley={showSmiley}>{children}</StyledContent>
    </Styled>
  );
};

export default LoadingIndicator;
