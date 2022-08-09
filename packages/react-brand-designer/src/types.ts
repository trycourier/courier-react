import React from "react";
import { CSSObject } from "styled-components";

export interface BrandDesignerProps {
  brand: BrandConfig;
  onChange: BrandHandler;
  saveButton: React.ReactNode;
  options?: BrandDesignerOptions;
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
  created?: string | number | Date;
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
  background?: string;
  fontFamily?: string;
  header?: {
    fontFamily?: string;
    background?: string;
  };
  preview?: {
    fontFamily?: string;
    background?: string;
    emailTitleColor?: string;
    emailTextColor?: string;
    emailBodyBackground?: string;
    emailButtonTextColor?: string;
    subjectHeaderTextColor?: string;
    subjectHeaderBackground?: string;
    fromTextColor?: string;
  };
}

export interface ClipboardBrandDesignerTheme extends BrandDesignerTheme {
  copyButtonCSS: CSSObject;
}

export type BrandHandler = (config: BrandConfig) => void;
