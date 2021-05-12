import React from "react";
import Toggle from "react-toggle";
import { PreferenceItemComponentFn } from "../types";
import { StyledToggle } from "./StyledToggle";

export const StatusPreference: PreferenceItemComponentFn = ({
  label,
  value,
  handleOnPreferenceChange,
}) => {
  const onToggleStatusChange = () => {
    const toggledValue = value === "OPTED_IN" ? "OPTED_OUT" : "OPTED_IN";
    handleOnPreferenceChange({ status: toggledValue });
  };
  return (
    <StyledToggle>
      <label>{label}</label>
      <Toggle
        icons={false}
        checked={value === "OPTED_IN" ? true : false}
        value={value}
        onChange={onToggleStatusChange}
      />
    </StyledToggle>
  );
};
