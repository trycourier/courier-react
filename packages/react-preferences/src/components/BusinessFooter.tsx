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

const SVGWrapper = styled.div`
  margin: 20px;
  display: flex;
  gap: 12.5px;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
  }
`;

export const BusinessFooter: React.FunctionComponent<{ links: any }> = ({
  links,
}) => {
  return (
    <FooterWrapper>
      <SVGWrapper>
        {links?.facebook?.url && (
          <a href={links.facebook.url}>
            <Facbebook />
          </a>
        )}
        {links?.instagram?.url && (
          <a href={links.instagram.url}>
            <Instagram />
          </a>
        )}
        {links?.linkedin?.url && (
          <a href={links.linkedin.url}>
            <LinkedIn />
          </a>
        )}
        {links?.medium?.url && (
          <a href={links.medium.url}>
            <Medium />
          </a>
        )}
        {links?.twitter?.url && (
          <a href={links.twitter.url}>
            <Twitter />
          </a>
        )}
      </SVGWrapper>
    </FooterWrapper>
  );
};
