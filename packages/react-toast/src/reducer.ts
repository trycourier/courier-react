import { IToastConfig } from "./types";

interface ToastState {
  config: IToastConfig;
}

export default (state: ToastState, action) => {
  switch (action.type) {
    case "toast/INIT": {
      return {
        ...state,
        config: action.payload.config,
        toast: action.payload.toast,
      };
    }
  }

  return state;
};
