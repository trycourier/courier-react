import React from "react";
import { CourierElement } from "@trycourier/react-elements";
import { BrandConfig } from "./types";
import { BrandDesigner } from "./brand-designer/brand-designer";

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

  return (
    <BrandDesigner
      config={config}
      onChange={handleChange}
      onSave={handleSave}
      saveButtonText={isCopied ? "Copied" : "Copy Snippet"}
      disableSaveButton={isCopied}
    />
  );
};
