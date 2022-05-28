import React from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./brand-designer-header";
import { BrandOptions } from "./brand-options";

export const BrandDesigner = () => {
  return (
    <BrandDesignerContainer>
      <BrandDesignerHeader />
      <BrandDesignerBody>
        <BrandOptions />
      </BrandDesignerBody>
    </BrandDesignerContainer>
  );
};

const BrandDesignerContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    width: "736px",
    height: "424px",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
  })
);

const BrandDesignerBody = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
  })
);
