import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

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

type GetRecipientPreferences = () => Promise<any>;
export const getRecipientPreferences = (
  client: Client
): GetRecipientPreferences => async () => {
  const results = await client.query(RECIPIENT_PREFERENCES).toPromise();
  return results.data?.recipientPreferences.nodes;
};

const UPDATE_RECIPIENT_PREFERENCES = `
  mutation($id: String!, $preferences: PreferencesInput!) {
    updatePreferences(templateId: $id preferences: $preferences)
  }
`;

type UpdateRecipientPreferences = (payload: {
  templateId: string;
  status: string;
}) => Promise<any>;
export const updateRecipientPreferences = (
  client: Client
): UpdateRecipientPreferences => async (payload) => {
  await client
    .mutation(UPDATE_RECIPIENT_PREFERENCES, {
      id: payload.templateId,
      preferences: { status: payload.status },
    })
    .toPromise();

  return payload;
};

export default (
  params: ICourierClientParams | { client: Client }
): {
  getRecipientPreferences: GetRecipientPreferences;
  updateRecipientPreferences: UpdateRecipientPreferences;
} => {
  let client: Client;

  if ("client" in params) {
    client = params.client;
  } else {
    client = createCourierClient(params as ICourierClientParams);
  }

  return {
    getRecipientPreferences: getRecipientPreferences(client),
    updateRecipientPreferences: updateRecipientPreferences(client),
  };
};
