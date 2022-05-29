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
};

export type BrandDesignerOpts = {
  config: BrandConfig;
  /** Save / Publish button was clicked */
  onSave: BrandHandler;
  onConfigChange: BrandHandler;
  isLoading?: boolean;
  isLogoLoading?: boolean;
  saveButtonText?: string;
  saveDate?: string;
  saveDatePrefix?: string;
  disableSaveButton?: boolean;
  title?: string;
};

export type BrandHandler = (config: BrandConfig) => void;
