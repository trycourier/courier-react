import React, { useState } from "react";
import Toggle from "react-toggle";
import { PreferenceItemComponentFn, PreferenceStatus } from "../types";
import { ChannelPreferences } from "./ChannelPreferences";
import { StyledToggle } from "./StyledToggle";

export const StatusPreference: PreferenceItemComponentFn = ({
  //label,
  value,
  onPreferenceChange,
  templateId,
  routingOptions,
}) => {
  const [checked, setChecked] = useState(
    ["REQUIRED", "OPTED_IN"].includes(value as PreferenceStatus)
  );

  const onToggleStatusChange = (event) => {
    setChecked(event.target.checked);
    const toggledValue = event.target.checked ? "OPTED_IN" : "OPTED_OUT";
    onPreferenceChange({ status: toggledValue });
  };

  return (
    <div>
      <StyledToggle checked={checked}>
        <label>{value === "REQUIRED" ? "Required" : "Opted In"}</label>
        <Toggle
          icons={false}
          disabled={value === "REQUIRED"}
          checked={checked}
          value={value}
          onChange={onToggleStatusChange}
        />
      </StyledToggle>
      {checked && (
        <ChannelPreferences
          onPreferenceChange={onPreferenceChange}
          templateId={templateId}
          routingOptions={routingOptions}
        />
      )}
    </div>
  );
};
