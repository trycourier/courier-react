import {
  ICourierEventCallback,
  ICourierEventMessage,
  ICourierMessage,
} from "./transports/types";
import ReconnectingWebSocket, { ErrorEvent } from "reconnecting-websocket";
import { ErrorEventHandler, WSOptions } from "./types";

export class WS {
  connection?: ReconnectingWebSocket;
  private subscriptions: Array<{
    channel: string;
    event?: string;
    callback: ICourierEventCallback;
  }>;
  private clientSourceId?: string;
  private authorization?: string;
  private clientKey?: string;
  private connectionTimeout?: number;
  private onError?: ErrorEventHandler;
  private onClose?: () => void;
  private onReconnectionHandlers: Array<{
    id: string;
    callback: () => void;
  }>;
  private url: string;
  private userSignature?: string;
  private connectionCount: number;
  protected connected;
  protected messageCallback;

  constructor({
    authorization,
    clientKey,
    options,
    clientSourceId,
    userSignature,
  }: {
    authorization?: string;
    clientSourceId?: string;
    clientKey?: string;
    options?: WSOptions;
    userSignature?: string;
  }) {
    this.connectionCount = 0;
    this.authorization = authorization;
    this.messageCallback = null;
    this.connection = undefined;
    this.connected = false;
    this.url =
      options?.url ||
      process.env.COURIER_WS_URL ||
      "wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production";
    this.clientSourceId = clientSourceId;
    this.clientKey = clientKey;
    this.userSignature = userSignature;
    this.subscriptions = [];
    this.onReconnectionHandlers = [];
    this.connectionTimeout = options?.connectionTimeout;
    this.onError = options?.onError;
    this.onClose = options?.onClose;
  }

  close(): void {
    if (!this.connected || !this.connection) {
      return;
    }

    this.connection.close();
  }

  getUrl(): string {
    return `${this.url}/?${
      this.authorization
        ? `auth=${this.authorization}`
        : `clientKey=${this.clientKey}`
    }`;
  }

  connect(): void {
    this.connection = new ReconnectingWebSocket(this.getUrl.bind(this), [], {
      connectionTimeout: this.connectionTimeout,
    });

    this.connection.onopen = this._onOpen.bind(this);
    this.connection.onclose = this._onClose.bind(this);
    this.connection.onerror = this._onError.bind(this);
    this.connection.onmessage = this._onMessage.bind(this);
  }

  private _onError(event: ErrorEvent): void {
    if (this.onError) {
      this.onError(event);
    } else {
      console.error("Error Connecting to Courier Push");
    }

    this.connection?.close();
  }

  private _onClose(): void {
    this.connected = false;
    if (this.onClose) {
      this.onClose();
    }
  }

  private _onOpen(): void {
    this.connected = true;
    this.connectionCount++;

    if (this.connectionCount > 1) {
      for (const reconnectHandler of this.onReconnectionHandlers) {
        reconnectHandler.callback();
      }
    }

    for (const sub of this.subscriptions) {
      this.send({
        action: "subscribe",
        data: {
          channel: sub.channel,
          clientSourceId: this.clientSourceId,
          clientKey: this.clientKey,
          event: sub.event,
          userSignature: this.userSignature,
          version: "3",
        },
      });
    }
  }

  private _onMessage({ data }: { data: string }): void {
    let message: ICourierMessage | ICourierEventMessage;

    try {
      message = JSON.parse(data);
    } catch {
      console.error("Error Parsing Courier Message");
      return;
    }

    if (message.error) {
      console.error(message.error);
      return;
    }

    for (const sub of this.subscriptions) {
      if (sub.event !== "*" && sub.event !== message?.event) {
        continue;
      }

      sub.callback({ type: message.type ?? "message", data: message });
    }
  }

  async subscribe(
    channel: string,
    event: string,
    callback: ICourierEventCallback
  ): Promise<void> {
    this.subscriptions.push({
      channel,
      event,
      callback,
    });

    if (this.connected) {
      this.send({
        action: "subscribe",
        data: {
          channel,
          clientSourceId: this.clientSourceId,
          clientKey: this.clientKey,
          event,
          userSignature: this.userSignature,
          version: "3",
        },
      });
    }
  }

  send(message: { [key: string]: any }): void {
    if (!this.connected || !this.connection) {
      console.warn("WS Not Connected");
      return;
    }

    this.connection.send(JSON.stringify(message));
  }

  unsubscribe(channel: string, event: string): void {
    this.subscriptions = this.subscriptions.filter((sub) => {
      return !(sub.channel === channel && sub.event === event);
    });

    this.send({
      action: "unsubscribe",
      data: {
        version: "3",
        channel,
        event,
        clientKey: this.clientKey,
        userSignature: this.userSignature,
      },
    });
  }

  renewSession(newAuthorization: string): void {
    this.authorization = newAuthorization;
    if (!this.connected || !this.connection) {
      this.connect();
      return;
    }

    this.send({
      action: "renewSession",
      data: {
        version: "3",
        auth: newAuthorization,
      },
    });
  }

  onReconnection(handler: { id: string; callback: () => void }): void {
    if (this.onReconnectionHandlers.find((h) => h.id === handler.id)) {
      this.onReconnectionHandlers = this.onReconnectionHandlers?.map((h) => {
        if (h.id === handler.id) {
          return handler;
        }

        return h;
      });
      return;
    }

    this.onReconnectionHandlers.push(handler);
  }
}
