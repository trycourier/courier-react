import { Client } from "urql";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "./types";
import { createCourierClient } from "./client";

const RECIPIENT_PREFERENCES = `
  query GetRecipientPreferences($accountId: String) {
    recipientPreferences(accountId: $accountId) {
      nodes {
        templateId
        status
        hasCustomRouting
        routingPreferences
        digestSchedule
      }
    }
  }
`;

const PREFERENCE_PAGE = `
  query($accountId: String) {
    preferencePage(accountId: $accountId) {
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
      channelConfigs {
        channelLabels {
          channel
          name
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
              data
              defaultStatus
              templateName
              templateId
              digestSchedules
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
      channelConfigs {
        channelLabels {
          channel
          name
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
              data
              defaultStatus
              templateName
              templateId
              digestSchedules
            }
          }
        }
      }
    }
  }
`;

type GetRecipientPreferences = (tenantId?: string) => Promise<any>;
export const getRecipientPreferences =
  (client: Client | undefined): GetRecipientPreferences =>
  async (tenantId?: string) => {
    if (!client) {
      return;
    }

    const results = await client
      .query(RECIPIENT_PREFERENCES, { accountId: tenantId })
      .toPromise();
    return results.data?.recipientPreferences.nodes;
  };

type GetPreferencePage = (tenantId?: string) => Promise<any>;
export const getPreferencePage =
  (client: Client | undefined): GetPreferencePage =>
  async (tenantId?: string) => {
    if (!client) {
      return;
    }
    const results = await client
      .query(PREFERENCE_PAGE, {
        // [HACK] map tenantId to accountId in order to keep this backwards compatible
        accountId: tenantId,
      })
      .toPromise();
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
  mutation UpdateRecipientPreferences($id: String!, $preferences: PreferencesInput!, $accountId: String) {
    updatePreferences(templateId: $id preferences: $preferences accountId: $accountId)
  }
`;

export interface UpdateRecipientPreferencesPayload {
  templateId: string;
  status?: string;
  hasCustomRouting?: boolean;
  routingPreferences?: Array<string>;
  digestSchedule?: string;
  tenantId?: string;
}

type UpdateRecipientPreferences = (
  payload: UpdateRecipientPreferencesPayload
) => Promise<any>;
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
          digestSchedule: payload.digestSchedule,
        },
        accountId: payload.tenantId,
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
