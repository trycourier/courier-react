import { WS } from "../../ws";
import { Transport } from "../base";
import { Interceptor } from "../types";
import { ITransportOptions } from "./types";

export class CourierTransport extends Transport {
  protected authorization?: string;
  protected clientSourceId: string;
  protected clientKey?: string;
  protected declare interceptor?: Interceptor;
  protected userSignature?: string;
  protected ws: WS;

  constructor(options: ITransportOptions) {
    super();

    if (!options.clientKey && !options.authorization) {
      throw new Error("Missing Authorization");
    }

    this.authorization = options.authorization;
    this.clientSourceId = options.clientSourceId;
    this.clientKey = options.clientKey;
    this.userSignature = options.userSignature;

    this.ws = new WS({
      authorization: options.authorization,
      clientSourceId: options.clientSourceId,
      clientKey: options.clientKey,
      options: options.wsOptions,
      userSignature: options.userSignature,
    });

    this.ws.connect();

    if (options.wsOptions?.onReconnect) {
      this.ws.onReconnection({
        id: "propReconnect",
        callback: options.wsOptions?.onReconnect,
      });
    }
  }

  closeConnection(): void {
    this.ws.close();
  }

  connect(): void {
    this.ws.connect();
  }

  keepAlive(): void {
    this.ws.send({
      action: "keepAlive",
    });
  }

  send(message): void {
    this.ws.send({
      ...message,
      data: {
        ...message.data,
        clientKey: this.clientKey,
      },
    });
  }

  subscribe(channel: string, event?: string): void {
    this.ws.subscribe(channel, event ?? "*", ({ data: courierEvent }) => {
      if (this.interceptor) {
        courierEvent = this.interceptor(courierEvent);
      }

      if (!courierEvent) {
        return;
      }

      this.emit({ type: courierEvent.type ?? "message", data: courierEvent });
    });
  }

  unsubscribe(channel: string, event?: string): void {
    this.ws.unsubscribe(channel, event ?? "*");
  }

  onReconnection(handler: { id: string; callback: () => void }): void {
    this.ws.onReconnection(handler);
  }

  renewSession(token: string): void {
    this.ws.renewSession(token);
  }
}
