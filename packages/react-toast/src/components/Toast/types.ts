import React from "react";
import { CourierMessage } from "@trycourier/react-provider";
export interface ICourierToastMessage extends CourierMessage {
  onClick?: (event: React.MouseEvent) => void;
}
