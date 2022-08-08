import React from "react";
import { CourierElement, LinkButton } from "@trycourier/react-elements";
import { BrandConfig } from "./types";
import { BrandDesigner } from "./brand-designer/brand-designer";
import styled, { CSSObject } from "styled-components";

/** Copy's Brand Config to Clipboard */
export const ClipboardBrandDesigner: CourierElement = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [config, setConfig] = React.useState<BrandConfig>({
    colors: {
      primary: "#22C3C6",
      secondary: "#FBB03B",
    },
  });
  const handleChange = (config: BrandConfig) => {
    setConfig(config);
    setIsCopied(false);
  };

  const handleSave = () => {
    navigator.clipboard.writeText(JSON.stringify(config, undefined, 2));
    setIsCopied(true);
  };

  const saveButton = (
    <CopyButton onClick={handleSave}>
      {isCopied ? "Copied" : "Copy Snippet"}
    </CopyButton>
  );

  return (
    <BrandDesigner
      brand={config}
      onChange={handleChange}
      saveButton={saveButton}
    />
  );
};

const CopyButton = styled(LinkButton)(
  (): CSSObject => ({
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#24324B",
    cursor: "pointer",
    background: "none",
    "&:hover": {
      background: "none",
    },
  })
);
