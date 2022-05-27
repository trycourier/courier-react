### [Title](#title)

A simple title. Uses `<h1>` as its root element.

Usage:

```tsx
import { Title } from "react-elements";

interface TitleProps {
  children: React.ReactNode;
  /** CSS Overrides to apply to the title*/
  css?: CSSObject;
}

<Title>Hello World</Title>;
```
