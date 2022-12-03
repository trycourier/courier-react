import { Client } from "urql";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "./types";
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
        logo {
          href
          image
        }
      }
      sections {
        nodes {
          name
          sectionId
          routingOptions
          hasCustomRouting
          topics {
            nodes {
              defaultStatus
              templateName
              templateId
            }
          }
        }
      }
    }
  }
`;

const DRAFT_PREFERENCE_PAGE = `
  query {
    draftPreferencePage {
      showCourierFooter
      brand {
        settings {
          colors {
            primary
          }
        }
        links
        logo {
          href
          image
        }
      }
      sections {
        nodes {
          name
          sectionId
          routingOptions
          hasCustomRouting
          topics {
            nodes {
              defaultStatus
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

export const getDraftPreferencePage =
  (client: Client | undefined): GetPreferencePage =>
  async () => {
    if (!client) {
      return;
    }

    const results = await client.query(DRAFT_PREFERENCE_PAGE).toPromise();
    return results.data?.draftPreferencePage;
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
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  getRecipientPreferences: GetRecipientPreferences;
  getPreferencePage: GetPreferencePage;
  getDraftPreferencePage: GetPreferencePage;
  updateRecipientPreferences: UpdateRecipientPreferences;
} => {
  const client = createCourierClient(params);

  return {
    getRecipientPreferences: getRecipientPreferences(client),
    getPreferencePage: getPreferencePage(client),
    getDraftPreferencePage: getDraftPreferencePage(client),
    updateRecipientPreferences: updateRecipientPreferences(client),
  };
};
