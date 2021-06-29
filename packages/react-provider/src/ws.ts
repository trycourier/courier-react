import { ICourierEventCallback } from "./transports/types";

export class WS {
  connection?: WebSocket;
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
  }

  connect(): void {
    const url = `${this.url}/?clientKey=${this.clientKey}`;
    this.connection = new WebSocket(url);

    if (!this.connection) {
      console.error("error creating courier websocket connection");
      setTimeout(() => {
        this.connect();
      }, 1000);
      return;
    }

    this.connection.onopen = () => {
      this.connected = true;
    };

    this.connection.onclose = () => {
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.connection.onmessage = this.onMessage.bind(this);
  }

  onMessage({ data }: { data: string }): void {
    try {
      data = JSON.parse(data);
    } catch {
      console.error("Error Parsing Message");
    }

    if (data && this.messageCallback) {
      this.messageCallback({ data });
    }
  }

  waitForOpen(): Promise<any> {
    return new Promise((resolve) => {
      if (this.connected) {
        resolve(true);
      } else {
        this.connection?.addEventListener("open", resolve);
      }
    });
  }

  async subscribe(
    channel: string,
    event: string,
    clientKey: string,
    callback: ICourierEventCallback
  ): Promise<void> {
    await this.waitForOpen();
    this.send({
      action: "subscribe",
      data: {
        channel,
        event,
        clientKey,
      },
    });
    this.messageCallback = callback;
  }

  send(message: { [key: string]: any }): void {
    if (!this.connected || !this.connection) {
      console.warn("WS Not Connected");
      return;
    }

    this.connection.send(JSON.stringify(message));
  }

  unsubscribe(channel: string, event: string, clientKey: string): void {
    this.send({
      action: "unsubscribe",
      data: {
        channel,
        event,
        clientKey,
      },
    });
  }

  close(): void {
    this.connection?.close();
  }
}
