### [Icons](#icons)

A set of icons.

Available icons:

- Courier
- CourierTextLogo

Usage:

```tsx
import { icons } from "react-elements";

export interface IconProps {
  /** Defaults to 100% of parent. */
  size?: "xs" | "sm" | "md" | "lg" | number;
  color?: string;
  /** CSS Overrides of the SVG container */
  css?: CSSObject;
  /** CSS Overrides of the SVG tag */
  svgCSS?: CSSObject;
}

<icons.Courier fill={"tomato"} />;
```
