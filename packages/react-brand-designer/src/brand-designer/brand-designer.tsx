import React, { FC } from "react";
import styled, { CSSObject, ThemeProvider, useTheme } from "styled-components";
import { BrandDesignerHeader } from "./designer-header";
import { BrandDesignerProps } from "../types";
import { BrandControls } from "./brand-controls";
import { BrandPreview } from "./brand-preview";
import { defaultBrandDesignerTheme } from "./default-theme";

export const BrandDesigner: FC<BrandDesignerProps> = (props) => {
  const { brand, onChange, saveButton, options } = props;
  const headerOpts = {
    title: options?.title,
    saveDate: brand.updated,
    saveDatePrefix: options?.dateUpdatedPrefix,
    saveButton,
  };
  const theme = props.theme ?? useTheme() ?? defaultBrandDesignerTheme;

  return (
    <ThemeProvider theme={theme}>
      <BrandDesignerContainer>
        <BrandDesignerHeader {...headerOpts} />
        <BrandDesignerBody>
          <BrandControls config={brand} onChange={onChange} />
          <PreviewSeparator />
          <BrandPreview brand={brand} options={options?.preview} />
        </BrandDesignerBody>
      </BrandDesignerContainer>
    </ThemeProvider>
  );
};

const BrandDesignerContainer = styled.div(
  ({ theme }): CSSObject => ({
    display: "flex",
    flexDirection: "column",
    width: "768px",
    height: "416px",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
    fontFamily: theme?.fontFamily,
  })
);

const BrandDesignerBody = styled.div(
  ({ theme }): CSSObject => ({
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    minHeight: 0,
    background: theme?.background,
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
