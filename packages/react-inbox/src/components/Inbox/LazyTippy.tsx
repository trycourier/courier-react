import React, { useState } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";

/*
https://github.com/atomiks/tippyjs-react/issues/288
found here: https://gist.github.com/atomiks/520f4b0c7b537202a23a3059d4eec908
*/
const LazyTippy: React.FunctionComponent<TippyProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
    }),
  };

  const computedProps = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];
  computedProps.content = mounted ? props.content : "";
  return <Tippy {...computedProps} />;
};

export default LazyTippy;
