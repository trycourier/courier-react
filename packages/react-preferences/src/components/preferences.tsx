import React from "react";
import {
  IPreferenceTemplate,
  usePreferenceTemplate,
} from "../hooks/use-preferences";
import { ChannelPreferences } from "./ChannelPreferences";
import { SnoozePreference } from "./SnoozePreference";
import { StatusPreference } from "./Status";
import { Preference, PreferenceItemComponentFn } from "./types";

const COURIER_SUPPORTED_PREFERENCES: Record<
  Preference,
  PreferenceItemComponentFn
> = {
  channel_preferences: ChannelPreferences,
  snooze: SnoozePreference,
  status: StatusPreference,
};

export const Preferences: React.FunctionComponent<{
  preferenceTemplateId: string;
}> = ({ preferenceTemplateId }) => {
  const [preferenceGroup, updatePreferenceGroup] = usePreferenceTemplate(
    preferenceTemplateId
  );

  if (!preferenceGroup) {
    return null;
  }

  const handleOnPreferenceChange = (
    changedIndex: number,
    changes: string | string[]
  ) => {
    const preferences = [...(preferenceGroup?.templateItems ?? [])];

    const updatedPreferences = {
      ...preferenceGroup,
      templateItems: [
        ...preferences.slice(0, changedIndex),
        {
          ...preferences[changedIndex],
          itemValue: changes,
        },
        ...preferences.slice(changedIndex + 1),
      ],
    } as IPreferenceTemplate;

    updatePreferenceGroup(updatedPreferences);
  };

  return (
    <>
      <h4>{preferenceGroup?.templateName}</h4>
      {preferenceGroup.templateItems.map((item, index) => {
        const PreferenceItem = COURIER_SUPPORTED_PREFERENCES[item.type];
        const handleOnPreferenceChangeForIndex = handleOnPreferenceChange.bind(
          null,
          index
        );
        return (
          <PreferenceItem
            key={index}
            label={item.itemName}
            value={item?.itemValue}
            handleOnPreferenceChange={handleOnPreferenceChangeForIndex}
          />
        );
      })}
    </>
  );
};
