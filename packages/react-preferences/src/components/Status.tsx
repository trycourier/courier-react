import React from "react";
import Toggle from "react-toggle";
import { PreferenceItemComponentFn } from "./types";
import { StyledToggle } from "./StyledToggle";

export const StatusPreference: PreferenceItemComponentFn = ({
  label,
  value = "OPTED_IN",
  handleOnPreferenceChange,
}) => {
  function onToggleStatusChange() {
    const toggledValue = value === "OPTED_IN" ? "OPTED_OUT" : "OPTED_IN";
    handleOnPreferenceChange(toggledValue);
  }
  return (
    <StyledToggle>
      <label>
        <span>{label}</span>
        <Toggle
          icons={false}
          checked={value === "OPTED_IN" ? true : false}
          value={value}
          onChange={onToggleStatusChange}
        />
      </label>
    </StyledToggle>
  );
};
