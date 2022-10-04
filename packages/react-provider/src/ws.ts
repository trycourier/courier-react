import { ICourierEventCallback, ICourierMessage } from "./transports/types";
import ReconnectingWebSocket, { ErrorEvent } from "reconnecting-websocket";
import { ErrorEventHandler } from "./types";

export class WS {
  connection?: ReconnectingWebSocket;
  private subscriptions: Array<{
    channel: string;
    event?: string;
    callback: ICourierEventCallback;
  }>;
  private authorization?: string;
  private clientKey?: string;
  private connectionTimeout?: number;
  private onError?: ErrorEventHandler;
  private url: string;
  private userSignature?: string;
  protected connected;
  protected messageCallback;

  constructor({
    authorization,
    clientKey,
    options,
    userSignature,
  }: {
    authorization?: string;
    clientKey?: string;
    options?: {
      connectionTimeout?: number;
      onError?: ErrorEventHandler;
      url?: string;
    };
    userSignature?: string;
  }) {
    this.authorization = authorization;
    this.messageCallback = null;
    this.connection = undefined;
    this.connected = false;
    this.url =
      options?.url ||
      process.env.COURIER_WS_URL ||
      "wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production";
    this.clientKey = clientKey;
    this.userSignature = userSignature;
    this.subscriptions = [];
    this.connectionTimeout = options?.connectionTimeout;
    this.onError = options?.onError;
  }

  connect(): void {
    this.connection = new ReconnectingWebSocket(
      `${this.url}/?${
        this.authorization
          ? `auth=${this.authorization}`
          : `clientKey=${this.clientKey}`
      }`,
      [],
      {
        connectionTimeout: this.connectionTimeout,
      }
    );

    this.connection.onopen = this._onOpen.bind(this);
    this.connection.onclose = this._onClose.bind(this);
    this.connection.onerror = this._onError.bind(this);
    this.connection.onmessage = this._onMessage.bind(this);
  }

  _onError(event: ErrorEvent): void {
    if (this.onError) {
      this.onError(event);
    } else {
      console.error("Error Connecting to Courier Push");
    }

    this.connection?.close();
  }

  _onClose(): void {
    this.connected = false;
  }

  _onOpen(): void {
    this.connected = true;

    for (const sub of this.subscriptions) {
      this.send({
        action: "subscribe",
        data: {
          version: "2",
          channel: sub.channel,
          event: sub.event,
          clientKey: this.clientKey,
          userSignature: this.userSignature,
        },
      });
    }
  }

  _onMessage({ data }: { data: string }): void {
    let message: ICourierMessage;

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

      sub.callback({ data: message });
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
          version: "2",
          channel,
          event,
          clientKey: this.clientKey,
          userSignature: this.userSignature,
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
        version: "2",
        channel,
        event,
        clientKey: this.clientKey,
        userSignature: this.userSignature,
      },
    });
  }

  close(): void {
    this.connection?.close();
  }
}
