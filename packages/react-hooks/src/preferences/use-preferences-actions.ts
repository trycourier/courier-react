import { useCourier } from "@trycourier/react-provider";
import {
  createCourierClient,
  Preferences,
  UpdateRecipientPreferencesPayload,
} from "@trycourier/client-graphql";

export interface UsePreferenceActions {
  fetchRecipientPreferences: (tenantId?: string) => void;
  fetchPreferencePage: (tenantId?: string, draft?: boolean) => void;
  updateRecipientPreferences: (
    payload: UpdateRecipientPreferencesPayload
  ) => void;
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
    fetchRecipientPreferences: (tenantId?: string) => {
      dispatch({
        type: "preferences/FETCH_RECIPIENT_PREFERENCES",
        payload: () => preferences.getRecipientPreferences(tenantId),
      });
    },
    fetchPreferencePage: (tenantId?: string, draft = false) => {
      if (draft) {
        dispatch({
          type: "preferences/FETCH_DRAFT_PREFERENCE_PAGE",
          payload: () => preferences.getDraftPreferencePage(),
        });
      } else {
        dispatch({
          type: "preferences/FETCH_PREFERENCE_PAGE",
          payload: () => preferences.getPreferencePage(tenantId),
        });
      }
    },
    updateRecipientPreferences: async (payload) => {
      dispatch({
        type: "preferences/UPDATE_RECIPIENT_PREFERENCES",
        payload: () => preferences.updateRecipientPreferences(payload),
      });
    },
  };
};

export default usePreferencesActions;
