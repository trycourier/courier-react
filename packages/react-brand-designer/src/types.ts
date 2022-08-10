import React from "react";
import { CSSObject } from "styled-components";

export interface BrandDesignerProps {
  brand: BrandConfig;
  onChange: BrandHandler;
  saveButton: React.ReactNode;
  options?: BrandDesignerOptions;
  theme?: BrandDesignerTheme;
}

export interface ClipboardBrandDesignerProps {
  /** Override the default clipboard designer brand */
  brand?: BrandConfig;
  theme?: BrandDesignerTheme;
}

export interface BrandConfig {
  colors: {
    primary: string;
    secondary: string;
    [key: string]: string;
  };
  logo?: {
    src: string | File;
    href?: string;
  };
  /** Can be one of ISO 8601 Date | Epoch MS | Javascript Date object */
  created?: string | number | Date;
  /** Can be one of ISO 8601 Date | Epoch MS | Javascript Date object */
  updated?: string | number | Date;
}

export interface BrandDesignerOptions {
  title?: string;
  dateUpdatedPrefix?: string;
  preview?: {
    subject?: string;
    from?: string;
    title?: string;
    body?: string;
    signature?: string;
    signaturePrefix?: string;
    buttonText?: string;
  };
}

export interface BrandDesignerTheme {
  /** Background CSS property. https://developer.mozilla.org/en-US/docs/Web/CSS/background */
  background?: string;
  fontFamily?: string;
  header?: {
    fontFamily?: string;
    background?: string;
  };
  preview?: {
    fontFamily?: string;
    /** Background CSS property. https://developer.mozilla.org/en-US/docs/Web/CSS/background */
    background?: string;
    emailTitleColor?: string;
    emailTextColor?: string;
    emailBodyBackground?: string;
    emailButtonTextColor?: string;
    subjectHeaderTextColor?: string;
    /** Background CSS property. https://developer.mozilla.org/en-US/docs/Web/CSS/background */
    subjectHeaderBackground?: string;
    fromTextColor?: string;
  };
}

export interface ClipboardBrandDesignerTheme extends BrandDesignerTheme {
  copyButtonCSS: CSSObject;
}

export type BrandHandler = (config: BrandConfig) => void;
