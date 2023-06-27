import { useCourier } from "@trycourier/react-provider";
import { createCourierClient, Preferences } from "@trycourier/client-graphql";

const usePreferencesActions = () => {
  const {
    accountId,
    apiUrl,
    clientKey,
    userId,
    userSignature,
    dispatch,
    authorization,
  } = useCourier();

  const courierClient = createCourierClient({
    apiUrl,
    authorization,
    clientKey,
    userId,
    userSignature,
  });

  const preferences = Preferences({ client: courierClient });

  return {
    fetchRecipientPreferences: () => {
      dispatch({
        type: "preferences/FETCH_RECIPIENT_PREFERENCES",
        payload: () => preferences.getRecipientPreferences(),
      });
    },
    fetchPreferencePage: (draft = false) => {
      if (draft) {
        dispatch({
          type: "preferences/FETCH_DRAFT_PREFERENCE_PAGE",
          payload: () => preferences.getDraftPreferencePage(accountId),
        });
      } else {
        dispatch({
          type: "preferences/FETCH_PREFERENCE_PAGE",
          payload: () => preferences.getPreferencePage(accountId),
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
