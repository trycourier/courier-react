import React from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./designer-header";
import { BrandPreview } from "./brand-preview";
import { BrandControls, BrandControlsOpts } from "./brand-controls";

export const BrandDesigner = () => {
  const [config, setConfig] = React.useState<BrandControlsOpts["config"]>({
    colors: {
      primary: "#22C3C6",
      secondary: "#FBB03B",
    },
  });

  return (
    <BrandDesignerContainer>
      <BrandDesignerHeader />
      <BrandDesignerBody>
        <BrandControls config={config} onChange={(conf) => setConfig(conf)} />
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
