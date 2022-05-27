### [Button](#button)

A simple button. Uses `<button>` as its root element.

Usage:

```tsx
import { Button } from 'react-elements';

interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  /** Color of the button */
  color?: string;
  /** Defaults to white */
  textColor?: string;
  /** CSS Overrides to apply to the button*/
  css?: CSSObject;
}


<Button onClick={doWork} css={{ borderRadius: 5 }}>
  Click Me!
<Button/>
```
