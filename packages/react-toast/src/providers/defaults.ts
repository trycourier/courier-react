import { IProviderConfig } from "../providers/types";

export const defaultConfig: IProviderConfig = {
  hideProgressBar: false,
  position: "top-right",
  theme: {
    root:{
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
      "> :nth-child(1)": {
        "paddingLeft": 13.3,
      },
      "> *" : {
        "padding": "13.3px 0",
      },
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
