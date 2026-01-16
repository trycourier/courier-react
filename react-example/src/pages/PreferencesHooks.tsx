import React, { useEffect } from "react";
import { usePreferences } from "@trycourier/react-hooks";

const PreferenceHooks: React.FC = () => {
  const preferences = usePreferences();

  useEffect(() => {
    preferences.fetchRecipientPreferences();
  }, []);

  return (
    <div>
      <pre style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
        {JSON.stringify(preferences.recipientPreferences, null, 2)}
      </pre>
    </div>
  );
};

export default PreferenceHooks;
