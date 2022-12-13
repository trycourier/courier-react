import React from "react";
import styled from "styled-components";
import Facbebook from "../assets/social-icons/icon-social-facebook.svg";
import Instagram from "../assets/social-icons/icon-social-instagram.svg";
import LinkedIn from "../assets/social-icons/icon-social-linkedin.svg";
import Medium from "../assets/social-icons/icon-social-medium.svg";
import Twitter from "../assets/social-icons/icon-social-twitter.svg";

const FooterWrapper = styled.div`
  background: ${({ theme }) => theme ?? "#9121c2"};
`;

const SVGWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  height: 100%;

  * svg {
    width: 25px;
  }

  * p {
    font-style: normal;
    color: white;
    font-weight: medium;
    font-size: 0.75em;
    white-space: nowrap;
  }
`;

export const BusinessFooter: React.FunctionComponent<{
  links: any;
  theme: string;
}> = ({ links, theme }) => {
  if (links === undefined || !Object.keys(links).length) {
    return <></>;
  }

  let emptyUrls;
  Object.keys(links).map((key) => {
    if (emptyUrls === false) {
      return;
    }
    if (!links[key]?.url?.length) {
      emptyUrls = true;
    } else {
      emptyUrls = false;
    }
  });
  if (emptyUrls) {
    return <></>;
  }

  return (
    <FooterWrapper theme={theme}>
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
