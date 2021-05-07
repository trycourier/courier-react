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
    this.connection = new WebSocket(url);
    if (!this.connection) {
      console.error("error creating websocket connection");
      return;
    }
    this.connection.onopen = () => {
      this.connected = true;
    };
    this.connection.onclose = () => {
      // i want to watch and see if we get connection closed events
      // i think we will want to reconnect when this happens
      console.warn("ws connection closed");
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
