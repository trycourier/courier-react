import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./designer-header";
import { BrandDesignerProps } from "../types";
import { BrandSidebar } from "./brand-sidebar";

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
      <BrandSidebar config={config} onChange={onChange} />
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
