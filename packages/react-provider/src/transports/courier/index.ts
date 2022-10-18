import { WS } from "../../ws";
import { Transport } from "../base";
import { Interceptor, ICourierMessage } from "../types";
import { ITransportOptions } from "./types";

export class CourierTransport extends Transport {
  protected ws: WS;
  protected authorization?: string;
  protected clientKey?: string;
  protected userSignature?: string;
  protected declare interceptor?: Interceptor;

  constructor(options: ITransportOptions) {
    super();

    if (!options.clientKey && !options.authorization) {
      throw new Error("Missing Authorization");
    }

    this.authorization = options.authorization;
    this.clientKey = options.clientKey;
    this.userSignature = options.userSignature;

    this.ws = new WS({
      authorization: options.authorization,
      clientKey: options.clientKey,
      options: options.wsOptions,
      userSignature: options.userSignature,
    });
    this.ws.connect();
  }

  send(message: ICourierMessage): void {
    this.ws.send({
      ...message,
      data: {
        ...message.data,
        clientKey: this.clientKey,
      },
    });
  }

  subscribe(channel: string, event?: string): void {
    this.ws.subscribe(channel, event ?? "*", ({ data }) => {
      if (this.interceptor) {
        data = this.interceptor(data);
      }

      if (!data) {
        return;
      }

      this.emit({ data });
    });
  }

  unsubscribe(channel: string, event?: string): void {
    this.ws.unsubscribe(channel, event ?? "*");
  }

  renewSession(token: string): void {
    this.ws.renewSession(token);
  }
}
