import { CourierWS } from "../ws";
import { Transport } from "../base";
import { Interceptor } from "@trycourier/core";
import { TransportOptions, IClientKeyOptions, IJWTOptions } from "./types";

export class CourierTransport extends Transport {
  protected tenantId?: string;
  protected authorization?: string;
  protected clientSourceId?: string;
  protected clientKey?: string;
  protected declare interceptor?: Interceptor;
  protected userSignature?: string;
  protected ws: CourierWS;

  constructor(options: TransportOptions) {
    super();

    const clientKeyOptions = options as IClientKeyOptions;
    const jwtOptions = options as IJWTOptions;

    if (!clientKeyOptions.clientKey && !jwtOptions.authorization) {
      throw new Error("Missing Authorization");
    }

    this.authorization = jwtOptions.authorization;
    this.clientSourceId = options.clientSourceId;
    this.clientKey = clientKeyOptions.clientKey;
    this.userSignature = clientKeyOptions.userSignature;

    this.ws = new CourierWS({
      tenantId: options.tenantId,
      authorization: jwtOptions.authorization,
      clientSourceId: options.clientSourceId,
      clientKey: clientKeyOptions.clientKey,
      options: options.wsOptions,
      userSignature: clientKeyOptions.userSignature,
    });

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

  isConnected(): boolean {
    return this.ws.connected;
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
