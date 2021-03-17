import { IToastConfig } from "./types";

export const defaultConfig: IToastConfig = {
  hideProgressBar: false,
  position: "top-right",
  theme: {
    root: {
      "*": {
        boxSizing: "border-box",
      },
      fontFamily: `"Nunito Sans", sans-serif`,
    },
    toast: {
      "width": 320,
      "minHeight": 65,
      "padding": 0,
      "borderRadius": 6,
    },
    body: {
      "margin": 0,
      "display": "flex",
    },
    progressBar: {
      background: "rgb(157, 55, 137)",
      height: 3,
      top: 0,
    },
    sidebar: {
      details: {
        ":hover": {
          opacity: .5,
        },
      },
      dismiss: {
        ":hover": {
          opacity: .5,
        },
      },
    },
  },
  transition: "slide",
};
