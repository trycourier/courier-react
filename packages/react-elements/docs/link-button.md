### [Link Button](#link-button)

A simple button. Uses `<a>` as its root element.

Usage:

```tsx
import { LinkButton } from 'react-elements';

interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  // Color of the button
  color?: string;
  /** Defaults to white */
  textColor?: string;
  /** CSS Overrides to apply to the button*/
  css?: CSSObject;
}

<LinkButton onClick={doWork} css={{ borderRadius: 5 }}>
  Click Me!
<LinkButton/>
```
