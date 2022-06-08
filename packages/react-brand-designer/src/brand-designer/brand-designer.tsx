import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./designer-header";
import { BrandPreview } from "./brand-preview";
import { BrandControls } from "./brand-controls";
import { BrandDesignerProps } from "../types";

export const BrandDesigner: FC<BrandDesignerProps> = (opts) => {
  const { config, onChange, onSave } = opts;
  const headerOpts = {
    title: opts.title,
    saveDate: config.updated,
    saveDatePrefix: opts.dateUpdatedPrefix,
    saveButtonText: opts.saveButtonText,
    disableSaveButton: opts.disableSaveButton,
    onSave: () => onSave(config),
  };

  return (
    <BrandDesignerContainer>
      <BrandDesignerHeader {...headerOpts} />
      <HeaderSeparator />
      <BrandDesignerBody>
        <BrandControls config={config} onChange={onChange} />
        <PreviewSeparator />
        <BrandPreview config={config} />
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
    flexBasis: "368px",
  })
);

const HeaderSeparator = styled.div(
  (): CSSObject => ({
    position: "absolute",
    width: "766px",
    height: "0px",
    left: "32px",
    top: "160px",
    border: "1px solid #E1E5E9",
  })
);

const PreviewSeparator = styled.div(
  (): CSSObject => ({
    position: "absolute",
    width: "334px",
    height: "0px",
    left: "115px",
    top: "345px",
    border: "1px solid #E1E5E9",
    transform: "rotate(90deg)",
  })
);
