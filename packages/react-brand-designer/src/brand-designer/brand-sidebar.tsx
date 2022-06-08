import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { BrandControls } from "./brand-controls";
import { BrandConfig, BrandHandler } from "../types";
import { BrandPreview } from "./brand-preview";

export type BrandSidebarProps = {
  config: BrandConfig;
  onChange: BrandHandler;
};

export const BrandSidebar: FC<BrandSidebarProps> = (opts) => {
  const { config, onChange } = opts;

  return (
    <BrandDesignerBody>
      <BrandControls config={config} onChange={onChange} />
      <PreviewSeparator />
      <BrandPreview config={config} />
    </BrandDesignerBody>
  );
};

const BrandDesignerBody = styled.div(
  (): CSSObject => ({
    display: "flex",
    flexDirection: "row",
    flexBasis: "368px",
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
