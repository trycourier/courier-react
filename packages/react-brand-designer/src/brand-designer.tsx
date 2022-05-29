import React from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./designer-header";
import { BrandPreview } from "./brand-preview";
import { BrandControls } from "./brand-controls";
import { BrandDesignerOpts } from "./types";
import { CourierElement } from "@trycourier/react-elements";

export const BrandDesigner: CourierElement<BrandDesignerOpts> = (opts) => {
  const { config, onConfigChange: onChange, onSave } = opts;
  const headerOpts = {
    title: opts.title,
    saveDate: opts.saveDate,
    saveDatePrefix: opts.saveDatePrefix,
    saveButtonText: opts.saveButtonText,
    disableSaveButton: opts.disableSaveButton,
    onSave: () => onSave(config),
  };

  return (
    <BrandDesignerContainer>
      <BrandDesignerHeader {...headerOpts} />
      <BrandDesignerBody>
        <BrandControls config={config} onChange={onChange} />
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
