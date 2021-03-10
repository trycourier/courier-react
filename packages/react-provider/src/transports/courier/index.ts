import { WS } from "../../ws";
import { Transport } from "../base";
import { Interceptor } from "../types";
import { COURIER_WS_URL } from "./constants";
import { ITransportOptions } from "./types";

export class CourierTransport extends Transport {
  protected channel: any;
  protected ws: WS;
  protected clientKey: string;
  protected secretKey?: string;
  protected interceptor?: Interceptor;
  
  constructor(options: ITransportOptions) {
    super();

    if (!options.clientKey) {
      throw new Error("Missing Client Key");
    }
    this.clientKey = options.clientKey;
    this.secretKey = options.secretKey;
    this.ws = new WS({ url: options.wsUrl ?? COURIER_WS_URL ?? "wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production" });
    this.ws.connect(options.clientKey);
  }

  send(message: any): void {
    this.ws.send({
      ...message,
      data :{
        ...message.data,
        clientKey: this.clientKey,
      },
    });
  }

  subscribe(channel: string, event: string): void {
    this.ws.subscribe(channel, event, this.clientKey, ({ data }) => {
      data = this.getDataFromInterceptor(data);

      if (!data) {
        return;
      }
      
      this.emit({ data });
    });
  }

  unsubscribe(channel: string, event: string): void {
    this.ws.unsubscribe(channel, event, this.clientKey);
  }

  getDataFromInterceptor = (data) => {
    if (this.interceptor) {
      data = this.interceptor(data);
    }

    return data;
  };
}
