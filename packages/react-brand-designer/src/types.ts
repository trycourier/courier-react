import React from "react";

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

export interface BrandDesignerProps {
  brand: BrandConfig;
  onChange: BrandHandler;
  saveButton: React.ReactNode;
  dateUpdatedPrefix?: string;
  title?: string;
}

export type BrandHandler = (config: BrandConfig) => void;

export interface BrandDesignerTheme {
  headerBackgroundColor?: string;
  backgroundColor?: string;
}
