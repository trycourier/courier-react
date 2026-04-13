import { useCourier } from "@trycourier/react-provider";
import {
  createCourierClient,
  Preferences,
  UpdateRecipientPreferencesPayload,
} from "@trycourier/client-graphql";

export interface UsePreferenceActions {
  fetchRecipientPreferences: (tenantId?: string) => Promise<any>;
  fetchPreferencePage: (tenantId?: string, draft?: boolean) => Promise<any>;
  updateRecipientPreferences: (
    payload: UpdateRecipientPreferencesPayload
  ) => Promise<any>;
}

const usePreferencesActions = (): UsePreferenceActions => {
  const { apiUrl, clientKey, userId, userSignature, dispatch, authorization } =
    useCourier();

  const courierClient = createCourierClient({
    apiUrl,
    authorization,
    clientKey,
    userId,
    userSignature,
  });

  const preferences = Preferences({ client: courierClient });

  return {
    fetchRecipientPreferences: async (tenantId?: string) => {
      const promise = preferences.getRecipientPreferences(tenantId);
      dispatch({
        type: "preferences/FETCH_RECIPIENT_PREFERENCES",
        payload: () => promise,
      });
      return promise;
    },
    fetchPreferencePage: async (tenantId?: string, draft = false) => {
      if (draft) {
        const promise = preferences.getDraftPreferencePage();
        dispatch({
          type: "preferences/FETCH_DRAFT_PREFERENCE_PAGE",
          payload: () => promise,
        });
        return promise;
      } else {
        const promise = preferences.getPreferencePage(tenantId);
        dispatch({
          type: "preferences/FETCH_PREFERENCE_PAGE",
          payload: () => promise,
        });
        return promise;
      }
    },
    updateRecipientPreferences: async (payload) => {
      const promise = preferences.updateRecipientPreferences(payload);
      dispatch({
        type: "preferences/UPDATE_RECIPIENT_PREFERENCES",
        payload: () => promise,
      });
      return promise;
    },
  };
};

export default usePreferencesActions;
