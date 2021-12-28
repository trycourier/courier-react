import React from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Inbox } from "@trycourier/react-inbox";
import { CourierProvider } from "@trycourier/react-provider";
import mockMiddleware from "./mock-middleware";

const API_URL = process.env.API_URL || "";
const CLIENT_KEY = process.env.CLIENT_KEY || "";
const USER_ID = process.env.USER_ID || "";
const WS_URL = process.env.WS_URL || "";

export default {
  title: "Inbox/Mobile",
  parameters: {
    //👇 The viewports object from the Essentials addon
    viewport: {
      //👇 The viewports you want to use
      viewports: INITIAL_VIEWPORTS,
      //👇 Your own default viewport
      defaultViewport: "iphone6",
    },
  },
};

export const Mobile = () => {
  return (
    <CourierProvider
      middleware={[mockMiddleware]}
      wsUrl={WS_URL}
      apiUrl={API_URL}
      clientKey={CLIENT_KEY}
      userId={USER_ID}
    >
      <Inbox />
    </CourierProvider>
  );
};
