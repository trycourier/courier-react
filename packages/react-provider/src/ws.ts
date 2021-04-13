import { ICourierEventCallback } from "./transports/types";

export class WS {
  connection?: WebSocket;
  protected connected;
  protected messageCallback;
  private url: string;
  constructor({ url }) {
    this.messageCallback = null;
    this.connection = undefined;
    this.connected = false;
    this.url = url;
  }

  connect(clientKey: string): void {
    const url = `${this.url}/?clientKey=${clientKey}`;

    if (typeof WebSocket) {
      this.connection = new WebSocket(url);
      this.initiateListener();
    }
  }

  onMessage({ data }: { data: string }): void {
    try {
      data = JSON.parse(data);
    } catch {
      //
    }

    if (data && this.messageCallback) {
      this.messageCallback({ data });
    }
  }

  onConnectionOpen(): void {
    this.connected = true;
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
    if (this.connected) {
      this.connection?.send(JSON.stringify(message));
    }
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

  initiateListener(): void {
    if (!this.connection) {
      return;
    }

    this.connection.onmessage = this.onMessage.bind(this);
  }
}
