import React from "react";
import { IMessage } from "../../transports/types";
export interface IToastMessage extends IMessage {
  onClick?: (event: React.MouseEvent) => void;
}
