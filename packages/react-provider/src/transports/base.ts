import { ICourierEvent, Interceptor } from "./types";

export class Transport {
  constructor() {
    this.listeners = [];
    this.interceptor = undefined;
  }

  /** Callback for emitted events  */
  protected listeners: Array<{
    id: string;
    listener: (courierEvent: ICourierEvent) => void
  }>;
  
  protected interceptor?: Interceptor;
  /** Wrapper method for emitted events  */
  protected emit = (courierEvent: ICourierEvent): void => {
    if (!this.listeners.length) {
      console.warn("No Listeners Registered");
      return;
    }

    for (const listener of this.listeners) {
      listener.listener(courierEvent);
    }
  };

  /** Setter method for a listener */
  listen = (listener: {
    id: string,
    listener: (courierEvent: ICourierEvent) => void
  }): void => {
    let didReplaceListener = false;
    this.listeners.map(l => {
      if (l.id === listener.id) {
        didReplaceListener = true;
        return listener
      }

      return l;
    });

    if (didReplaceListener) {
      return;
    }

    this.listeners.push(listener);
  };

  intercept = (cb: Interceptor): void => {
    this.interceptor = cb;
  };
}

