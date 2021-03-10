import React from "react";
import { ICourierMessage } from "@trycourier/react-provider";
export interface ICourierToastMessage extends ICourierMessage {
  onClick?: (event: React.MouseEvent) => void;
}
