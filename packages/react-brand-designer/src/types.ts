export type BrandConfig = {
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
};

export type BrandDesignerOpts = {
  config: BrandConfig;
  /** Save / Publish button was clicked */
  onSave: BrandHandler;
  onChange: BrandHandler;
  isLoading?: boolean;
  isLogoLoading?: boolean;
  saveButtonText?: string;
  dateUpdatedPrefix?: string;
  disableSaveButton?: boolean;
  title?: string;
};

export type BrandHandler = (config: BrandConfig) => void;
