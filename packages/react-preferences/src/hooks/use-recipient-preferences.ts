import { useCourier, ICourierContext } from "@trycourier/react-provider";
import { useState } from "react";
import { IPreferenceTemplate } from "typings/hooks";
import { IPreference } from ".";

const UPDATE_RECIPIENT_PREFERENCES = `
  mutation($id: String!, $preferences: PreferencesInput!) {
    updatePreferences(templateId: $id preferences: $preferences)
  }
`;

export function useRecipientPreference(
  preferenceTemplate: IPreferenceTemplate
): [IPreference, (changes: Partial<IPreference>) => void] {
  const [recipientPreferences, updateRecipientPreferences] = useState<
    IPreference
  >(preferenceTemplate.value);

  const context = useCourier<ICourierContext | undefined>();

  const handleOnPreferenceChange = (changes: Partial<IPreference>): void => {
    // Update local state
    updateRecipientPreferences((prevState) => ({ ...prevState, ...changes }));
    // Update the remote state
    const { snooze, status, channel_preferences } = {
      ...recipientPreferences,
      ...changes,
    };
    context?.graphQLClient?.mutate(UPDATE_RECIPIENT_PREFERENCES, {
      id: preferenceTemplate.templateId,
      preferences: { snooze, status, channel_preferences },
    });
  };

  return [recipientPreferences, handleOnPreferenceChange];
}
