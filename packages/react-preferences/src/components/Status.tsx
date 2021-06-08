import React, { useState } from "react";
import Toggle from "react-toggle";
import { PreferenceItemComponentFn, PreferenceStatus } from "../types";
import { StyledToggle } from "./StyledToggle";

export const StatusPreference: PreferenceItemComponentFn = ({
  //label,
  value,
  onPreferenceChange,
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
    <StyledToggle checked={checked}>
      <label>Opted In</label>
      <Toggle
        icons={false}
        disabled={value === "REQUIRED"}
        checked={checked}
        value={value}
        onChange={onToggleStatusChange}
      />
    </StyledToggle>
  );
};
