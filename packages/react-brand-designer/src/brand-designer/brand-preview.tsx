import { Button, CourierElement } from "@trycourier/react-elements";
import React from "react";
import styled, { CSSObject } from "styled-components";
import { BrandConfig, BrandDesignerOptions } from "../types";

export type BrandPreviewProps = {
  brand: BrandConfig;
  options?: BrandDesignerOptions["preview"];
};

export const BrandPreview: CourierElement<BrandPreviewProps> = ({
  brand,
  options,
}) => {
  return (
    <PreviewContainer>
      <EmailPreview>
        <EmailSubject>
          <div>
            <h3>
              Subject:{" "}
              <strong>{options?.subject ?? "Hi, {First name}! 👋"}</strong>
            </h3>
            <h4>From: {options?.from ?? "noreply@courier.com"}</h4>
          </div>
        </EmailSubject>
        <EmailBodyContainer>
          <EmailBody>
            <EmailTopBar color={brand.colors.primary} />
            <div className="email-content">
              <LogoPreview logo={brand.logo} />
              <h3>{options?.title ?? "This is a branded email"}</h3>
              {options?.body ? (
                <p>{options.body}</p>
              ) : (
                <p>
                  You&#39;ll always able to adjust the specifics of this email
                  in the designer. You can adjust more details of this email in
                  the advanced settings.
                </p>
              )}
              <EmailActionButton color={brand.colors.secondary}>
                {options?.buttonText ?? "Example CTA"}
              </EmailActionButton>
              <p>
                {options?.signaturePrefix ?? "Cheers,"}
                <br />
                <strong>{options?.signature ?? "The Courier Team"}</strong>
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
  ({ theme }): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme?.background ?? "#F9FAFB",
    height: "100%",
    flexGrow: 1,
  })
);

const EmailPreview = styled.div(
  ({ theme }): CSSObject => ({
    width: "356px",
    height: "278px",
    background: theme?.preview?.background ?? "#F0F0F0",
    display: "flex",
    flexDirection: "column",
    borderRadius: "2.99px",
    boxShadow: "0px 2.98532px 18.6583px rgba(0, 0, 0, 0.2)",
  })
);

const EmailSubject = styled.div(
  ({ theme }): CSSObject => ({
    background: theme?.preview?.subjectHeaderBackground ?? "#FFF",
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
      fontFamily: theme?.preview?.fontFamily ?? "Helvetica, sans-serif",
      fontSize: "10.45px",
      lineHeight: "12px",
      color: theme?.preview?.subjectHeaderTextColor,
    },
    h4: {
      margin: 0,
      marginTop: "2.31px",
      fontWeight: 400,
      fontFamily: theme?.preview?.fontFamily ?? "Helvetica, sans-serif",
      fontSize: "7.46px",
      lineHeight: "9px",
      color: theme?.preview?.fromTextColor ?? "#73819B",
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
  ({ theme }): CSSObject => ({
    background: theme?.preview?.background ?? "#FFF",
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
        fontFamily: theme?.preview?.fontFamily ?? "Helvetica, sans-serif",
        fontSize: "18px",
        lineHeight: "21px",
        color: theme?.preview?.emailTitleColor,
      },
      p: {
        fontFamily: theme?.preview?.fontFamily ?? "Helvetica, sans-serif",
        fontWeight: 400,
        fontSize: "9.75px",
        lineHeight: "13px",
        color: theme?.preview?.emailTextColor ?? "#344563",
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
  ({ color, theme }): CSSObject => ({
    background: color,
    height: "21.64px",
    padding: "4px 17px",
    fontFamily: theme?.preview?.fontFamily ?? "'Nunito Sans', sans-serif",
    fontWeight: 600,
    fontSize: "9.7px",
    color: theme?.preview?.buttonTextColor ?? "#fff",
  })
);
