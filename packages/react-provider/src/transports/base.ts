import { ICourierEvent, Interceptor } from "./types";

enum ListenerType {
  message = "message",
  event = "event",
}
export class Transport {
  constructor() {
    this.listeners = {
      message: [],
      event: [],
    };
    this.interceptor = undefined;
  }

  /** Callback for emitted events  */
  protected listeners: {
    [key in ListenerType]: Array<{
      id: string;
      listener: (courierEvent: ICourierEvent) => void;
    }>;
  };

  protected interceptor?: Interceptor;
  /** Wrapper method for emitted events  */
  protected emit = (courierEvent: ICourierEvent): void => {
    const eventType = courierEvent.type ?? "message";
    const listeners = this.listeners[eventType];

    if (!listeners.length) {
      console.warn("No Listeners Registered");
      return;
    }

    for (const { listener } of listeners) {
      listener(courierEvent);
    }
  };

  /** Setter method for a listener */
  listen = (listener: {
    id: string;
    type?: "message" | "event";
    listener: (courierEvent: ICourierEvent) => void;
  }): void => {
    let didReplaceListener = false;
    const eventType = listener.type ?? "message";
    let listeners = this.listeners[eventType];

    listeners = listeners.map((l) => {
      if (l.id === listener.id) {
        didReplaceListener = true;
        return listener;
      }

      return l;
    });

    if (didReplaceListener) {
      this.listeners[eventType] = listeners;
      return;
    }

    this.listeners[eventType] = [...this.listeners[eventType], listener];
  };

  intercept = (cb: Interceptor): void => {
    this.interceptor = cb;
  };
}
