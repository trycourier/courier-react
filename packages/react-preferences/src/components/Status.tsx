import React from "react";
import Toggle from "react-toggle";
import { PreferenceItemComponentFn, PreferenceStatus } from "../types";
import { StyledToggle } from "./StyledToggle";

export const StatusPreference: PreferenceItemComponentFn = ({
  //label,
  value,
  handleOnPreferenceChange,
}) => {
  const onToggleStatusChange = (event) => {
    const toggledValue = event.target.checked ? "OPTED_IN" : "OPTED_OUT";
    handleOnPreferenceChange({ status: toggledValue });
  };

  const checked = ["REQUIRED", "OPTED_IN"].includes(value as PreferenceStatus);
  return (
    <StyledToggle checked={checked}>
      <label>Opted In</label>
      <Toggle
        icons={false}
        checked={checked}
        value={value}
        onChange={onToggleStatusChange}
      />
    </StyledToggle>
  );
};
