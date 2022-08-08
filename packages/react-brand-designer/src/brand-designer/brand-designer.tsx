import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./designer-header";
import { BrandDesignerProps } from "../types";
import { BrandControls } from "./brand-controls";
import { BrandPreview } from "./brand-preview";

export const BrandDesigner: FC<BrandDesignerProps> = (opts) => {
  const { brand, onChange, saveButton } = opts;
  const headerOpts = {
    title: opts.title,
    saveDate: brand.updated,
    saveDatePrefix: opts.dateUpdatedPrefix,
    saveButton,
  };

  return (
    <BrandDesignerContainer>
      <BrandDesignerHeader {...headerOpts} />
      <BrandDesignerBody>
        <BrandControls config={brand} onChange={onChange} />
        <PreviewSeparator />
        <BrandPreview config={brand} />
      </BrandDesignerBody>
    </BrandDesignerContainer>
  );
};

const BrandDesignerContainer = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    width: "768px",
    height: "416px",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
  })
);

const BrandDesignerBody = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    minHeight: 0,
    backgroundColor: "#F9FAFB",
  })
);

const PreviewSeparator = styled.div(
  (): CSSObject => ({
    width: "0px",
    height: "330px",
    marginTop: "17.5px",
    border: "1px solid #E1E5E9",
  })
);
