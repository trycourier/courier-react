import React from "react";
import styled from "styled-components";
import { usePreferences } from "@trycourier/react-hooks";

import { StatusPreference } from "./Status";
import {
  ChannelClassification,
  IPreferenceTemplate,
  IRecipientPreference,
} from "../types";

const StyledItem = styled.div`
  border-bottom: 1px solid #dadce0;
  padding: 10px;
  margin-top: 6px;
  background: white;
  border-radius: 4px;
  color: #333;

  .template-name {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 6px;
    font-weight: bold;
  }
`;

export const PreferenceTemplate: React.FunctionComponent<{
  preferenceTemplate: IPreferenceTemplate;
  recipientPreference?: IRecipientPreference;
  routingOptions: Array<ChannelClassification>;
  customizeDeliveryChannel?: boolean;
}> = ({
  preferenceTemplate,
  recipientPreference,
  routingOptions,
  customizeDeliveryChannel,
}) => {
  const { updateRecipientPreferences } = usePreferences();

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
      <div className="template-name">{preferenceTemplate.templateName}</div>
      <StatusPreference
        value={
          preferenceTemplate?.defaultStatus === "REQUIRED"
            ? "REQUIRED"
            : recipientPreference?.status ?? preferenceTemplate?.defaultStatus
        }
        onPreferenceChange={handleOnPreferenceChange}
        templateId={preferenceTemplate.templateId}
        routingOptions={routingOptions}
        customizeDeliveryChannel={customizeDeliveryChannel}
      />
    </StyledItem>
  );
};
