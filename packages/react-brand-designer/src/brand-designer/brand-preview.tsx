import { Button, CourierElement } from "@trycourier/react-elements";
import React from "react";
import styled, { CSSObject } from "styled-components";
import { BrandConfig } from "../types";

export type BrandPreviewProps = {
  config: BrandConfig;
};

export const BrandPreview: CourierElement<BrandPreviewProps> = ({ config }) => {
  return (
    <PreviewContainer>
      <EmailPreview>
        <EmailSubject>
          <div>
            <h3>
              Subject: <strong>Hi, {"{First name}"}! 👋</strong>
            </h3>
            <h4>From: noreply@courier.com</h4>
          </div>
        </EmailSubject>
        <EmailBodyContainer>
          <EmailBody>
            <EmailTopBar color={config.colors.primary} />
            <div className="email-content">
              <LogoPreview logo={config.logo} />
              <h3>This is a branded email</h3>
              <p>
                You’ll always able to adjust the specifics of this email in the
                designer. You can adjust more details of this email in the
                advanced settings.
              </p>
              <EmailActionButton color={config.colors.secondary}>
                Example CTA
              </EmailActionButton>
              <p>
                Cheers,
                <br />
                <strong>The Courier Team</strong>
              </p>
            </div>
          </EmailBody>
        </EmailBodyContainer>
      </EmailPreview>
    </PreviewContainer>
  );
};

const LogoPreview: CourierElement<{ logo?: BrandConfig["logo"] }> = ({
  logo,
  className,
}) => {
  if (!logo || typeof logo.src !== "string") {
    return null;
  }

  const image = <LogoPreviewImg src={logo.src} className={className} />;

  if (logo.href) {
    return <a href={logo.href}>{image}</a>;
  }

  return image;
};

const LogoPreviewImg = styled.img`
  max-width: 100px;
  margin-top: 0.8em;
`;

const PreviewContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9FAFB",
    height: "100%",
    flexGrow: 1,
  })
);

const EmailPreview = styled.div(
  (): CSSObject => ({
    width: "356px",
    height: "278px",
    background: "#F0F0F0",
    display: "flex",
    flexDirection: "column",
    borderRadius: "2.99px",
    boxShadow: "0px 2.98532px 18.6583px rgba(0, 0, 0, 0.2)",
  })
);

const EmailSubject = styled.div(
  (): CSSObject => ({
    background: "#FFF",
    boxSizing: "border-box",
    padding: "11.33px 14.62px",
    flexBasis: 45.7,
    borderRadius: "2.99px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    h3: {
      margin: 0,
      fontWeight: 400,
      fontFamily: "Helvetica, sans-serif",
      fontSize: "10.45px",
      lineHeight: "12px",
    },
    h4: {
      margin: 0,
      marginTop: "2.31px",
      fontWeight: 400,
      fontFamily: "Helvetica, sans-serif",
      color: "#73819B",
      fontSize: "7.46px",
      lineHeight: "9px",
    },
  })
);

const EmailBodyContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  })
);

const EmailBody = styled.div(
  (): CSSObject => ({
    background: "#FFF",
    overflow: "hidden",
    width: "328px",
    height: "204px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "2.99px",
    "div.email-content": {
      padding: "1.2em",
      paddingTop: "0em",
      boxSizing: "border-box",
      overflow: "scroll",
      h3: {
        marginTop: "0.7em",
        fontFamily: "Helvetica, sans-serif",
        fontSize: "18px",
        lineHeight: "21px",
      },
      p: {
        fontFamily: "Helvetica, sans-serif",
        fontWeight: 400,
        fontSize: "9.75px",
        lineHeight: "13px",
        color: "#344563",
      },
    },
  })
);

const EmailTopBar = styled.div<{ color: string }>(
  ({ color }): CSSObject => ({
    background: color,
    width: "100%",
    minHeight: "0.15em",
    // position: "fixed",
  })
);

const EmailActionButton = styled(Button)<{ color: string }>(
  ({ color }): CSSObject => ({
    background: color,
    height: "21.64px",
    padding: "4px 17px",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 600,
    fontSize: "9.7px",
  })
);
