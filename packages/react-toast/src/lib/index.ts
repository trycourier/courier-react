import { Bounce, Slide, Zoom } from "react-toastify";

export function mergeConfig(defaultConfig, config) {
  return {
    ...defaultConfig,
    ...config,
    theme: {
      ...defaultConfig?.theme,
      ...config?.theme,
    },
  };
}

export function getTransition(type?: string) {
  switch (type) {
    case "slide":
      return Slide;
    case "zoom":
      return Zoom;
    case "bounce":
      return Bounce;

    default: {
      return Slide;
    }
  }
}
