import React from "react";
import styled, { CSSObject } from "styled-components";
import { BrandDesignerHeader } from "./brand-designer-header";
import { BrandDesignerPreview } from "./brand-designer-preview";
import { BrandOptions, BrandOptionsParams } from "./brand-options";

export const BrandDesigner = () => {
  const [options, setOptions] = React.useState<BrandOptionsParams["options"]>({
    colors: {
      primary: "#22C3C6",
      secondary: "#FBB03B",
    },
  });

  return (
    <BrandDesignerContainer>
      <BrandDesignerHeader />
      <BrandDesignerBody>
        <BrandOptions options={options} onChange={(opts) => setOptions(opts)} />
        <BrandDesignerPreview colors={options.colors} />
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
