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
  padding: 12px 18px;
  margin-top: 8px;
  background: #f9fafb;
  border-radius: 4px;
  color: #333;

  h4 {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 6px;
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

  if (!preferenceTemplate) {
    return null;
  }

  return (
    <StyledItem>
      <h4>{preferenceTemplate.templateName}</h4>
      {Object.keys(COURIER_SUPPORTED_PREFERENCES).map((preference, index) => {
        const PreferenceItem = COURIER_SUPPORTED_PREFERENCES[preference];
        return (
          <PreferenceItem
            key={index}
            label={preference}
            value={recipientPreferences?.[preference]}
            handleOnPreferenceChange={handleOnPreferenceChange}
          />
        );
      })}
    </StyledItem>
  );
};
