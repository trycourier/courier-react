import React, { forwardRef } from "react";
import styled from "styled-components";
import deepExtend from "deep-extend";

export const StyledButton = styled.button(({ theme }) =>
  deepExtend(
    {
      border: "none",
      background: "transparent",
      padding: 0,
      outline: "none",
      position: "relative",

      ".unread-badge": {
        position: "absolute",
        top: -1,
        right: -1,
        borderRadius: "100%",
        padding: 5,
        background: theme?.brand?.colors?.secondary ?? "#de5063",
        animation: "badge-pulse 10s infinite",
      },

      svg: {
        cursor: "pointer",
        height: 20,
        width: 20,
        transition: "all 0.05s ease-in-out",
        path: {
          fill: theme?.brand?.colors?.primary ?? "#9121C2",
        },
      },
    },
    theme.icon
  )
);

const Bell: React.ForwardRefExoticComponent<{
  className?: string;
  hasUnreadMessages?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
}> = forwardRef(
  ({ className, hasUnreadMessages, onClick, onMouseEnter }, ref) => {
    return (
      <StyledButton
        className={className}
        data-testid="bell-svg"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        ref={ref}
      >
        {hasUnreadMessages && (
          <div data-testid="unread-badge" className="unread-badge" />
        )}
        <svg
          width="22"
          height="26"
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 0C12.7808 0 14.2355 1.40227 14.3171 3.16118C17.42 4.47334 19.5094 7.53448 19.5094 10.9997V15.7815C20.9003 15.8881 22 17.0525 22 18.4717C22 19.961 20.7891 21.1698 19.2978 21.1698H2.70222C1.21001 21.1698 0 19.9625 0 18.4717C0 17.0529 1.09784 15.888 2.49057 15.7815V10.9997C2.49057 7.53376 4.57997 4.47308 7.68287 3.16109C7.76462 1.40184 9.22056 0 11 0ZM9.03362 4.8716C6.39286 5.71772 4.56604 8.18161 4.56604 10.9997V15.9804C4.56604 17.0118 3.72925 17.8491 2.69898 17.8491C2.35533 17.8491 2.07547 18.129 2.07547 18.4717C2.07547 18.8152 2.35522 19.0943 2.70222 19.0943H19.2978C19.6437 19.0943 19.9245 18.814 19.9245 18.4717C19.9245 18.1295 19.6435 17.8491 19.301 17.8491C18.269 17.8491 17.434 17.0144 17.434 15.9804V10.9997C17.434 8.18232 15.607 5.71785 12.9663 4.87164L12.2453 4.64057V3.31724C12.2453 2.6327 11.6875 2.07547 11 2.07547C10.3134 2.07547 9.75472 2.63285 9.75472 3.31724V4.64056L9.03362 4.8716ZM7.0566 21.1698H9.13208C9.13208 22.2014 9.96837 23.0377 11 23.0377C12.0316 23.0377 12.8679 22.2014 12.8679 21.1698H14.9434C14.9434 23.3477 13.1779 25.1132 11 25.1132C8.82212 25.1132 7.0566 23.3477 7.0566 21.1698Z"
            fill="#9121c2"
          />
        </svg>
      </StyledButton>
    );
  }
);

export default Bell;
