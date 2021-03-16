import React, { forwardRef } from "react";
import styled from "styled-components";

export const StyledButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  outline: none;

  svg {
    cursor: pointer;
    height: 20px;
    width: 20px;
    :hover g {
      fill: #9d3789;
      transition: all 0.05s ease-in-out;
    }
  }
`;

const Bell: React.ForwardRefExoticComponent<{
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
  onClick: (event: React.MouseEvent) => void;
}> = forwardRef(({ className, onClick }, ref) => {
  return (
    <StyledButton
      className={className}
      data-testid="bell-svg"
      onClick={onClick}
      ref={ref}
    >
      <svg
        width="54px"
        height="63px"
        viewBox="0 0 54 63"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="courier-icon"
          transform="translate(0.000000, -419.000000)"
          fill="#AD9DD1"
          fillRule="nonzero"
        >
          <g id="alarm-bell" transform="translate(0.000000, 419.000000)">
            <path
              d="M50.627342,47.3818445 C49.8780936,45.5141757 49.5001398,43.5454815 49.5001398,41.5327715 L49.5001398,27.0000696 C49.5001398,16.9189781 42.7905255,8.4653362 33.6353373,5.61323904 C33.0910643,2.43321569 30.3329921,0 26.9999494,0 C23.6669067,0 20.9088346,2.43321569 20.364724,5.61323904 C11.2095358,8.4653362 4.49992154,16.9189781 4.49992154,27.0000696 L4.49992154,41.5327715 C4.49992154,43.5454815 4.12196772,45.5141757 3.37271934,47.3818445 L0.160355488,55.4149808 C-0.11657243,56.1093268 -0.0308141073,56.891542 0.386608033,57.5111748 C0.806304069,58.1308075 1.5027656,58.4999884 2.24990251,58.4999884 L19.3538153,58.4999884 C20.949115,61.2114297 23.7945697,63 27.0001119,63 C30.205654,63 33.0511087,61.2114297 34.6464084,58.4999884 L51.7503212,58.4999884 C52.4974581,58.4999884 53.1939196,58.1308075 53.6136157,57.5111748 C54.0308754,56.891542 54.1164713,56.1093268 53.8397058,55.4149808 L50.627342,47.3818445 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </svg>
    </StyledButton>
  );
});

export default Bell;
