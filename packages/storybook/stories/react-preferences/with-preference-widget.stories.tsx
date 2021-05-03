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
  const preferenceTemplateId = "D0N6ZNH5NFMA08JEXW6J6T3ZC6QA";
  const { API_URL, CLIENT_KEY, USER_ID } = process.env;
  return (
    <div style={{ width: "25%" }}>
      <CourierProvider apiUrl={API_URL} clientKey={CLIENT_KEY} userId={USER_ID}>
        <Preferences preferenceTemplateId={preferenceTemplateId}></Preferences>
      </CourierProvider>
    </div>
  );
}
