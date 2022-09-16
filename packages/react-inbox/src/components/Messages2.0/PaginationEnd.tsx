import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  color: #566074;
  font-size: 12px;
  padding: 12px;
  font-weight: 600;
  div {
    padding-top: 6px;
  }

  svg {
    path {
      fill: ${({ theme }) => {
        return theme.brand?.colors?.primary;
      }};
    }
  }
`;

const PaginationEnd: React.FunctionComponent = () => {
  return (
    <Styled>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1901_4061)">
          <path
            opacity="0.08"
            d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          />
          <path d="M12 19C8.14 19 5 15.86 5 12C5 11.725 5.225 11.5 5.5 11.5C5.775 11.5 6 11.725 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 11.725 18.225 11.5 18.5 11.5C18.775 11.5 19 11.725 19 12C19 15.86 15.86 19 12 19Z" />
          <path d="M9.5 11C10.0523 11 10.5 10.3284 10.5 9.5C10.5 8.67157 10.0523 8 9.5 8C8.94772 8 8.5 8.67157 8.5 9.5C8.5 10.3284 8.94772 11 9.5 11Z" />
          <path d="M14.5 11C15.0523 11 15.5 10.3284 15.5 9.5C15.5 8.67157 15.0523 8 14.5 8C13.9477 8 13.5 8.67157 13.5 9.5C13.5 10.3284 13.9477 11 14.5 11Z" />
        </g>
        <defs>
          <clipPath id="clip0_1901_4061">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div>{"You have no more messages"}</div>
    </Styled>
  );
};

export default PaginationEnd;
