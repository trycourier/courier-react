const UPDATE_RECIPIENT_PREFERENCES = `
  mutation($id: String!, $preferences: PreferencesInput!) {
    updatePreferences(templateId: $id preferences: $preferences)
  }
`;

export const updateRecipientPreferences = async (client, payload) => {
  await client.mutate(UPDATE_RECIPIENT_PREFERENCES, {
    id: payload.templateId,
    preferences: { status: payload.status },
  });

  return payload;
};
