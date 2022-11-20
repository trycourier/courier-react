import { useCourier } from "@trycourier/react-provider";
import { createCourierClient, Preferences } from "@trycourier/client-graphql";

const usePreferencesActions = () => {
  const { apiUrl, clientKey, userId, userSignature, dispatch } = useCourier();

  const courierClient = createCourierClient({
    apiUrl,
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
      const dispatchType =
        draft === true
          ? "preferences/FETCH_DRAFT_PREFERENCE_PAGE"
          : "preferences/FETCH_PREFERENCE_PAGE";

      dispatch({
        type: dispatchType,
        payload: () => preferences.getPreferencePage(),
      });
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
