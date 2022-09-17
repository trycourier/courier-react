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

const PREFERENCE_PAGE = `
  query {
    preferencePage {
      showCourierFooter
      brand {
        settings {
          colors {
            primary
          }
        }
        links
      }
      sections {
        nodes {
          name
          sectionId
          routingOptions
          topics {
            nodes {
              templateName
              templateId
            }
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

type GetPreferencePage = () => Promise<any>;
export const getPreferencePage =
  (client: Client | undefined): GetPreferencePage =>
  async () => {
    if (!client) {
      return;
    }

    const results = await client.query(PREFERENCE_PAGE).toPromise();
    return results.data?.preferencePage;
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
  getPreferencePage: GetPreferencePage;
  updateRecipientPreferences: UpdateRecipientPreferences;
} => {
  const client = createCourierClient(params);

  return {
    getRecipientPreferences: getRecipientPreferences(client),
    getPreferencePage: getPreferencePage(client),
    updateRecipientPreferences: updateRecipientPreferences(client),
  };
};
