import { ICourierEvent, Interceptor } from "./types";

export class Transport {
  constructor() {
    this.listener = undefined;
    this.interceptor = undefined;
  }

  /** Callback for emitted events  */
  protected listener?: (courierEvent: ICourierEvent) => void;
  protected interceptor?: Interceptor;
  /** Wrapper method for emitted events  */
  protected emit = (courierEvent: ICourierEvent): void => {
    if (!this.listener) {
      console.warn("No Listener Registered");
      return;
    }
    this.listener(courierEvent);
  };

  /** Setter method for a listener */
  listen = (listener: (courierEvent: ICourierEvent) => void): void => {
    this.listener = listener;
  };

  intercept = (cb: Interceptor): void => {
    this.interceptor = cb;
  };
}

