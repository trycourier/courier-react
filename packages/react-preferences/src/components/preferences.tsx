import React from "react";
import styled from "styled-components";
import { useRecipientPreference } from "~/hooks/use-recipient-preferences";

import { ChannelPreferences } from "./ChannelPreferences";
import { SnoozePreference } from "./SnoozePreference";
import { StatusPreference } from "./Status";
import {
  IPreferenceTemplate,
  Preference,
  PreferenceItemComponentFn,
} from "../types";

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
  const [
    recipientPreferences,
    handleOnPreferenceChange,
  ] = useRecipientPreference(preferenceTemplate);

  if (!preferenceTemplate || !recipientPreferences) {
    return null;
  }

  return (
    <StyledItem>
      <h4>{preferenceTemplate.templateName}</h4>
      {Object.keys(COURIER_SUPPORTED_PREFERENCES)
        .filter((preference) => recipientPreferences[preference])
        .map((preference, index) => {
          const PreferenceItem = COURIER_SUPPORTED_PREFERENCES[preference];
          return (
            <PreferenceItem
              key={index}
              label={preference}
              value={recipientPreferences[preference]}
              handleOnPreferenceChange={handleOnPreferenceChange}
            />
          );
        })}
    </StyledItem>
  );
};
