import React from "react";
import styled from "styled-components";
import usePreferenceActions from "~/hooks/use-preferences-actions";

import { StatusPreference } from "./Status";
import { IPreferenceTemplate, IRecipientPreference } from "../types";

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

export const Preferences: React.FunctionComponent<{
  preferenceTemplate: IPreferenceTemplate;
  recipientPreference?: IRecipientPreference;
}> = ({ preferenceTemplate, recipientPreference }) => {
  const { updateRecipientPreferences } = usePreferenceActions();

  const handleOnPreferenceChange = (newPreferences) => {
    updateRecipientPreferences({
      templateId: preferenceTemplate.templateId,
      ...newPreferences,
    });
  };

  if (!preferenceTemplate) {
    return null;
  }

  return (
    <StyledItem>
      <h4>{preferenceTemplate.templateName}</h4>
      <StatusPreference
        value={
          preferenceTemplate?.defaultStatus === "REQUIRED"
            ? "REQUIRED"
            : recipientPreference?.status ?? preferenceTemplate?.defaultStatus
        }
        onPreferenceChange={handleOnPreferenceChange}
      />
    </StyledItem>
  );
};
