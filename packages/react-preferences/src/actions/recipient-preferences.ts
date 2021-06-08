const RECIPIENT_PREFERENCES = `
  query {
    recipientPreferences {
      nodes {
        templateId
        status
      }
    }
  }
`;

export const getRecipientPreferences = async (client) => {
  const results = await client.query(RECIPIENT_PREFERENCES);
  return results.data?.recipientPreferences.nodes;
};
