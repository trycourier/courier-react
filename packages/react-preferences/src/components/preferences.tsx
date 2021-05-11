import React from "react";
import styled from "styled-components";
import { useRecipientPreference } from "~/hooks/use-recipient-preferences";
import { IPreferenceTemplate } from "../hooks";
import { ChannelPreferences } from "./ChannelPreferences";
import { SnoozePreference } from "./SnoozePreference";
import { StatusPreference } from "./Status";
import { Preference, PreferenceItemComponentFn } from "./types";

const StyledItem = styled.div`
  border-bottom: 1px solid #dadce0;
  padding: 8px;
  margin-bottom: 5px;
  padding: 0 24px;
  height: 5rem;
  color: #333;
  h4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

const COURIER_SUPPORTED_PREFERENCES: Record<
  Preference,
  PreferenceItemComponentFn
> = {
  channel_preferences: ChannelPreferences,
  snooze: SnoozePreference,
  status: StatusPreference,
};

export const Preferences: React.FunctionComponent<{
  preferenceTemplate: IPreferenceTemplate;
}> = ({ preferenceTemplate }) => {
  const preferenceItems = preferenceTemplate?.templateItems ?? [];

  const [
    recipientPreferences,
    handleOnPreferenceChange,
  ] = useRecipientPreference(preferenceTemplate);

  if (!preferenceTemplate) {
    return null;
  }

  return (
    <StyledItem>
      <h4>{preferenceTemplate.templateName}</h4>
      {preferenceItems.map((item, index) => {
        const PreferenceItem = COURIER_SUPPORTED_PREFERENCES[item.type];
        return (
          <PreferenceItem
            key={index}
            label={item.itemName}
            value={recipientPreferences[item.type]}
            handleOnPreferenceChange={handleOnPreferenceChange}
          />
        );
      })}
    </StyledItem>
  );
};
