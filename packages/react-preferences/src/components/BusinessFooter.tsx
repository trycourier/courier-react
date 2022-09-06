import React from "react";
import styled from "styled-components";
import Facbebook from "../assets/social-icons/icon-social-facebook.svg";
import Instagram from "../assets/social-icons/icon-social-instagram.svg";
import LinkedIn from "../assets/social-icons/icon-social-linkedin.svg";
import Medium from "../assets/social-icons/icon-social-medium.svg";
import Twitter from "../assets/social-icons/icon-social-twitter.svg";

export const StyledList = styled.div`
  overflow: scroll;
  display: flex;
  height: 433px;
  flex-direction: column;
  border-top: 1px solid rgba(203, 213, 224, 0.5);
  background: rgba(255, 255, 255, 0.2);
`;

const FooterWrapper = styled.div`
  background: #721dc7;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  * p {
    font-style: normal;
    color: white;
    font-weight: bold;
    font-size: 0.75em;
    white-space: nowrap;
  }
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 2.5px;
  padding: 5px 50px;
  border: 0.5px solid #ffffff;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
  p {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
  }
`;

const SVGWrapper = styled.div`
  margin: 20px;
  display: flex;
  gap: 12.5px;
  justify-content: center;
  align-items: center;

  > svg {
    width: 20px;
  }
`;

export const BusinessFooter: React.FunctionComponent = () => {
  return (
    <FooterWrapper>
      <SVGWrapper>
        <Facbebook />
        <Instagram />
        <LinkedIn />
        <Medium />
        <Twitter />
      </SVGWrapper>
      <Button href="/">
        <p>Home page</p>
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.0392 7.69575L4.5096 4.54163L1.0392 1.37009C0.570225 0.95186 1.33934 0.23739 1.80831 0.673043L5.76644 4.24539C5.93527 4.40222 5.93527 4.66361 5.76644 4.80302L1.80831 8.41022C1.33934 8.82845 0.570226 8.11398 1.0392 7.69575Z"
            fill="#F9FAFB"
          />
        </svg>
      </Button>
    </FooterWrapper>
  );
};
