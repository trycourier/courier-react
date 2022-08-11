# Courier React Brand Designer

React Brand Designer is an embeddable react component that allows customers to design
email branding without leaving your site. This branding is can then be applied to
emails sent using [Courier](courier.com)

## Installation

```
npm i @trycourier/react-brand-designer

# Styled Components is a required peer dependency
npm i styled-components
```

## Usage

This package offers three brand designer components:

- `BrandDesigner` - The core BYOB (bring your own backend) brand designer component. This component
  provides the core UI functionality of the brand designer while being highly customizable. Think
  of it as a special html "input" type, it's up to you to handle the data.
- `ClipboardBrandDesigner` - The is a complete "plug-n-play" implementation of the core `BrandDesigner`
  component. As the name suggests, this component saves the brand to users clipboard.
- `CourierBrandDesigner` (Coming Soon) - This is another "plug-n-play" solution utilizing Courier's
  backend infrastructure to store and manage created brands.

### Clipboard Brand Designer

The easiest way to get started is using the `ClipboardBrandDesigner`. This version of the designer
copies brand JSON directly to the users clipboard. The brand JSON can be inlined as the `message.brand`
field of a Courier send call.

Basic Usage:

```tsx
import { ClipboardBrandDesigner } from "@trycourier/react-brand-designer`

const MyApp = () => {
  return (
    <div>
      <h1>Design Your Brand!</h1>
      <ClipboardBrandDesigner />
    </div>
  )
}
```

Component Props Interface:

```ts
export interface ClipboardBrandDesignerProps {
  /** Override the default clipboard designer brand. See API#BrandConfig section for more details */
  brand?: BrandConfig;

  /** See theming for more details */
  theme?: BrandDesignerTheme;
}
```

### Brand Designer

Basic Usage:

```tsx
import React, { FC } from "react";
import { BrandDesigner, BrandConfig } from "@trycourier/react-brand-designer";
import { Button } from "@trycourier/react-elements"; // Optional (requires separate install)

const MyApp = () => {
  const [brand, setBrand] = React.useState<BrandConfig>({
    // Default brand configuration
    colors: {
      primary: "#22C3C6",
      secondary: "#FBB03B",
    },
  });

  const handleSave = (brand: BrandConfig) => {
    /** Business logic here */
  };

  // The core brand designer does not include a "save button".
  const saveButton = <Button onClick={handleSave}>Save</Button>;

  return (
    <div>
      <h1>Design Your Brand!</h1>
      <BrandDesigner
        brand={brand}
        onChange={setBrand}
        saveButton={saveButton}
      />
    </div>
  );
};
```

Component Props Interface:

```ts
export interface BrandDesignerProps {
  /** Override the default clipboard designer brand. See API#BrandConfig section for more details */
  brand: BrandConfig;
  onChange: (brand: BrandConfig) => void;
  saveButton: React.ReactNode;
  /** Override the default clipboard designer brand. See API#BrandDesigner section for more details */
  options?: BrandDesignerOptions;
  /** See theming for more details */
  theme?: BrandDesignerTheme;
}
```

## Theming

Virtually every aspect of the brand designer is customizable. Each brand component accepts
the following optional theme

```ts
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
```

The `ClipboardBrandDesigner` extends the above with the following interface:

```ts
export interface ClipboardBrandDesignerTheme extends BrandDesignerTheme {
  copyButtonCSS: CSSObject;
}
```

These themes can be passed using `ThemeProvider` from `styled-components`, or by
passing it as the `theme` property:

```tsx
import { ThemeProvider } from "styled-components"
import { ClipboardBrandDesigner, ClipboardBrandDesignerTheme } from "@trycourier/react-brand-designer`

const MyApp = () => {
  const myTheme: ClipboardBrandDesignerTheme = {
    background: "blue",
    fontFamily: "'Comic Sans'",
  }

  return (
    <div>
      <h1>Theme Option 1</h1>
      <ThemeProvider theme={theme}>
        <ClipboardBrandDesigner />
      </ThemeProvider>

      <h1>Theme Option 2</h1>
      <ThemeProvider theme={theme}>
        <ClipboardBrandDesigner />
      </ThemeProvider>
    </div>
  )
}
```

## API

### BrandConfig

`BrandConfig` is the primary interface / JSON structure used to define a brand. This is the value
that is passed to Courier on send.

```ts
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
```

### BrandDesigner

```ts
// The properties passed to the BrandDesigner component
export interface BrandDesignerProps {
  /** Defined in API#BrandConfig */
  brand: BrandConfig;
  onChange: (brand: BrandConfig) => void;
  saveButton: React.ReactNode;
  options?: BrandDesignerOptions;
  theme?: BrandDesignerTheme;
}

// Allows you to customize the various properties of the brand designer, from
// the designer's title, to the body of text in the email preview window
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
```
