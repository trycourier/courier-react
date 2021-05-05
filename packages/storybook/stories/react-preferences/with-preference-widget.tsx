import React from "react";
import { Preferences } from "@trycourier/react-preferences";
import { CourierProvider } from "@trycourier/react-provider";

export default {
  title: "Preferences",
  component: Preferences,
  argTypes: {
    preferenceTemplateId: "string",
  },
  args: {},
};

export function Widget(): React.ReactElement {
  const {
    API_URL,
    CLIENT_KEY,
    USER_ID,
    PREFERENCE_TEMPLATE_ID,
  } = process.env as {
    API_URL: string;
    USER_ID: string;
    PREFERENCE_TEMPLATE_ID: string;
    CLIENT_KEY: string;
  };

  return (
    <div style={{ width: "45%" }}>
      <CourierProvider apiUrl={API_URL} clientKey={CLIENT_KEY} userId={USER_ID}>
        <Preferences
          preferenceTemplateId={PREFERENCE_TEMPLATE_ID}
        ></Preferences>
      </CourierProvider>
    </div>
  );
}
