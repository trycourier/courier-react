import { ICourierEventCallback, ICourierMessage } from "./transports/types";
import ReconnectingWebSocket from "reconnecting-websocket";

export class WS {
  connection?: ReconnectingWebSocket;
  private subscriptions: Array<{
    channel: string;
    event?: string;
    callback: ICourierEventCallback;
  }>;
  protected connected;
  protected messageCallback;
  private url: string;
  private clientKey: string;

  constructor({ url, clientKey }: { url: string; clientKey: string }) {
    this.messageCallback = null;
    this.connection = undefined;
    this.connected = false;
    this.url = url;
    this.clientKey = clientKey;
    this.subscriptions = [];
  }

  connect(): void {
    this.connection = new ReconnectingWebSocket(
      `${this.url}/?clientKey=${this.clientKey}`
    );

    this.connection.onopen = this.onOpen.bind(this);
    this.connection.onclose = this.onClose.bind(this);
    this.connection.onmessage = this.onMessage.bind(this);
  }

  onClose(): void {
    this.connected = false;
  }

  onOpen(): void {
    this.connected = true;

    for (const sub of this.subscriptions) {
      this.send({
        action: "subscribe",
        data: {
          channel: sub.channel,
          event: sub.event,
          clientKey: this.clientKey,
        },
      });
    }
  }

  onMessage({ data }: { data: string }): void {
    let message: ICourierMessage;

    try {
      message = JSON.parse(data);
    } catch {
      console.error("Error Parsing Courier Message");
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
          channel,
          event,
          clientKey: this.clientKey,
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
        channel,
        event,
        clientKey: this.clientKey,
      },
    });
  }

  close(): void {
    this.connection?.close();
  }
}
