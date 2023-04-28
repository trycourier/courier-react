import React from "react";
import ReactMarkdown from "react-markdown";
import overviewMd from "@trycourier/react-elements/docs/0.overview.md";
import {
  BrandConfig,
  BrandDesigner as BrandDesignerComponent,
} from "@trycourier/react-brand-designer";
import { Button } from "@trycourier/react-elements"; // Optional (requires separate install)

export default {
  title: "Brand Designer",
};

export const BrandDesigner = () => {
  const [brand, setBrand] = React.useState<BrandConfig>({
    // Default brand configuration
    colors: {
      primary: "#22C3C6",
      secondary: "#FBB03B",
    },
  });

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    /** Business logic here */
  };

  // The core brand designer does not include a "save button".
  const saveButton = <Button onClick={handleSave}>Save</Button>;
  return (
    <>
      <ReactMarkdown>{overviewMd}</ReactMarkdown>
      <BrandDesignerComponent
        brand={brand}
        onChange={setBrand}
        saveButton={saveButton}
      />
    </>
  );
};
