<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Props](#props)
- [What is Inbox?](#what-is-inbox)
  - [How does @trycourier/react-inbox work?](#how-does-trycourierreact-inbox-work)
  - [Theme](#theme)
  - [Render Props](#render-props)
  - [Hooks](#hooks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="0propsmd"></a>

### [Props](#props)

```
interface IHeaderProps {
  title: string;
  unreadMessageCount?: number;
  markAllAsRead?: () => any;
  currentTab?: ITab;
  messages: IMessage[];
}

interface ITab {
  filters: {
    isRead?: boolean;
  };
  label: string;
  id: string;
}

interface InboxProps {
  //Brand Override
  brand?: Brand;

  //Icon Class Name
  className?: string;

  // defaults to true
  openLinksInNewTab?: boolean;

  // Default Icon to use if no Icon is present in Message
  defaultIcon?: false | string;

  // Placement of the Bell relative to the Inbox
  placement?: "top" | "left" | "right" | "bottom";

  // Render Props for Custom Rendering
  renderTabs?: React.FunctionComponent<{
    currentTab?: ITab;
    tabs?: ITab[];
  }>;
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
  }>;
  renderBlocks?: {
    action?: React.FunctionComponent<IActionBlock>;
    text?: React.FunctionComponent<ITextBlock>;
  }
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent<IHeaderProps>;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;

  // Tab Overrides
  tabs?: Array<ITab>;
  theme?: ThemeObject;

  // Inbox Title Override
  title?: string;
  trigger?: "click" | "hover";

  formatDate?: (date: string) => string;
  labels?: {
    backToInbox?: string;
    emptyState?: string;
    markAllAsRead?: string;
    markAsRead?: string;
    markAsUnread?: string;
  }
}
```

<a name="1overviewmd"></a>

## What is Inbox?

Inbox is a react component that you can add to your application show your users a list of recent messages they have received over a `push` channel.

Upcoming Features:

- Browser Web Push
- Presence

### How does @trycourier/react-inbox work?

The react inbox requires a backend to pull messages. This is all done through the `CourierProvider` and requires an account at [Courier](https://www.courier.com). To set up Courier Inbox you will need to install Courier from the integrations page. [Courier Push integration](https://app.courier.com/integrations/courier)
After installing the integration you will be provided with a Client Key

![image](https://user-images.githubusercontent.com/16184018/109491559-8f8ee600-7a3e-11eb-9aa4-742639274fde.png)

As of right now, we will fetch all messages sent to any `push` channel and display them in the `inbox`.

<a name="1thememd"></a>

### [Theme](#theme)

```
interface ITheme {
  container?: React.CSSProperties;
  emptyState?: React.CSSProperties;
  footer?: React.CSSProperties;
  header?: React.CSSProperties;
  icon?: React.CSSProperties & {
    open?: string;
    closed?: string;
  };
  messageList?: {
    container?: React.CSSProperties;
  };
  message?: {
    actions?: {
      container?: React.CSSProperties;
      details?: React.CSSProperties;
      dismiss?: React.CSSProperties;
    }
    body?: React.CSSProperties;
    container?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
    unreadIndicator?: React.CSSProperties;
  };
  tabList?: {
    container?: React.CSSProperties;
    tab?: React.CSSProperties;
  };
  root?: React.CSSProperties;
}
```

<a name="2render-propsmd"></a>

### [Render Props](#render-props)

[Render Props](https://reactjs.org/docs/render-props.html) are a react concept that allows you to supply your own react components instead of the ones built for this library. **Inbox** supplies render props for most sub components.

To overrwrite the rendering of each of these you can supply your own react component.

```
// Render Props for Custom Rendering
  renderBlocks?: {
    action?: React.FunctionComponent<IActionBlock>;
    text?: React.FunctionComponent<ITextBlock>;
  };
  renderContainer?: React.FunctionComponent;
  renderTabs?: React.FunctionComponent<{
    currentTab?: ITab;
    tabs?: ITab[];
  }>;
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
  }>;
  renderFooter?: React.FunctionComponent;
  renderHeader?: React.FunctionComponent;
  renderIcon?: React.FunctionComponent<{
    isOpen: boolean;
    unreadMessageCount?: number;
  }>;
  renderMessage?: React.FunctionComponent<IMessage>;
  renderNoMessages?: React.FunctionComponent;
```

<a name="3hooksmd"></a>

### [Hooks](#hooks)

`useInbox` is a hook that you can import and use to interact with Inbox without having to use any of the react components. Think of it as a `headless` Inbox.
