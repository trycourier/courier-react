import { WS } from "../../ws";
import { Transport } from "../base";
import { Interceptor, ICourierMessage } from "../types";
import { COURIER_WS_URL } from "./constants";
import { ITransportOptions } from "./types";

export class CourierTransport extends Transport {
  protected ws: WS;
  protected clientKey: string;
  protected userSignature?: string;
  protected declare interceptor?: Interceptor;

  constructor(options: ITransportOptions) {
    super();

    if (!options.clientKey) {
      throw new Error("Missing Client Key");
    }

    this.clientKey = options.clientKey;
    this.userSignature = options.userSignature;
    this.ws = new WS({
      clientKey: options.clientKey,
      userSignature: options.userSignature,
      url:
        options.wsUrl ||
        COURIER_WS_URL ||
        "wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production",
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
}
