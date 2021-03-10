import { Transport } from "../transports";

export function throwOnNoTransport(transport) {
  if (transport && !(transport instanceof Transport)) {
    throw new Error("Invalid Transport");
  }
}