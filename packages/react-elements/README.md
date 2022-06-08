<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [React Elements](#react-elements)
  - [Button](#button)
  - [Icons](#icons)
  - [Link Button](#link-button)
  - [Title](#title)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0overviewmd"></a>

## React Elements

Courier React Elements is a package of bite sized components that are shared between our
larger components like Inbox and Toast.

This package includes highly reusable components such as buttons, icons, and modals.

Caution: This package is not yet stable. Interfaces are subject to change.

<a name="buttonmd"></a>

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

<a name="iconsmd"></a>

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

<a name="link-buttonmd"></a>

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

<a name="titlemd"></a>

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
