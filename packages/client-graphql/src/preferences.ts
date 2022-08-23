import { Client } from "urql";
import { ICourierClientBasicParams } from "./types";
import { createCourierClient } from "./client";

const RECIPIENT_PREFERENCES = `
  query GetRecipientPreferences {
    recipientPreferences {
      nodes {
        templateId
        status
        hasCustomRouting
        routingPreferences
      }
    }
  }
`;

const PREFERENCE_SECTIONS = `
  query GetPreferenceSections {
    preferenceSections {
      nodes {
        name
        sectionId
        routingOptions
        preferenceGroups {
          nodes {
            templateName
            templateId
          }
        }
      }
    }
  }
`;

type GetRecipientPreferences = () => Promise<any>;
export const getRecipientPreferences =
  (client: Client | undefined): GetRecipientPreferences =>
  async () => {
    if (!client) {
      return;
    }

    const results = await client.query(RECIPIENT_PREFERENCES).toPromise();
    return results.data?.recipientPreferences.nodes;
  };

type GetPreferenceSections = () => Promise<any>;
export const getPreferenceSections =
  (client: Client | undefined): GetPreferenceSections =>
  async () => {
    if (!client) {
      return;
    }

    const results = await client.query(PREFERENCE_SECTIONS).toPromise();
    return results.data?.preferenceSections.nodes;
  };

const UPDATE_RECIPIENT_PREFERENCES = `
  mutation UpdateRecipientPreferences($id: String!, $preferences: PreferencesInput!) {
    updatePreferences(templateId: $id preferences: $preferences)
  }
`;

type UpdateRecipientPreferences = (payload: {
  templateId: string;
  status: string;
  hasCustomRouting: boolean;
  routingPreferences: Array<string>;
}) => Promise<any>;
export const updateRecipientPreferences =
  (client: Client | undefined): UpdateRecipientPreferences =>
  async (payload) => {
    if (!client) {
      return Promise.resolve();
    }

    await client
      .mutation(UPDATE_RECIPIENT_PREFERENCES, {
        id: payload.templateId,
        preferences: {
          status: payload.status,
          hasCustomRouting: payload.hasCustomRouting,
          routingPreferences: payload.routingPreferences,
        },
      })
      .toPromise();

    return payload;
  };

export default (
  params: ICourierClientBasicParams | { client?: Client }
): {
  getRecipientPreferences: GetRecipientPreferences;
  getPreferenceSections: GetPreferenceSections;
  updateRecipientPreferences: UpdateRecipientPreferences;
} => {
  const client = createCourierClient(params);

  return {
    getRecipientPreferences: getRecipientPreferences(client),
    getPreferenceSections: getPreferenceSections(client),
    updateRecipientPreferences: updateRecipientPreferences(client),
  };
};
