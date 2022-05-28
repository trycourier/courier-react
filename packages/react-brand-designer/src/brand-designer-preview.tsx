import React from "react";
import styled, { CSSObject } from "styled-components";

export const BrandDesignerPreview = () => {
  return (
    <BrandDesignerPreviewContainer>
      <BrandDesignerEmail>
        <BrandDesignerEmailSubject>
          <div>
            <h3>
              Subject: <strong>Hi, {"{First name}"}! 👋</strong>
            </h3>
            <h4>From: noreply@courier.com</h4>
          </div>
        </BrandDesignerEmailSubject>
      </BrandDesignerEmail>
    </BrandDesignerPreviewContainer>
  );
};

const BrandDesignerPreviewContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#E5E5E5",
    height: "100%",
    flexGrow: 1,
  })
);

const BrandDesignerEmail = styled.div(
  (): CSSObject => ({
    width: "356px",
    height: "278px",
    background: "#F0F0F0",
    display: "flex",
    flexDirection: "column",
    borderRadius: "2.99px",
  })
);

const BrandDesignerEmailSubject = styled.div(
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
      fontWeight: 400,
      fontFamily: "Helvetica, sans-serif",
      color: "#73819B",
      fontSize: "7.46px",
      lineHeight: "9px",
    },
  })
);
