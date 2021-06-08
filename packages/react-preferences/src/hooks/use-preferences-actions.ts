import { useCourier } from "@trycourier/react-provider";
import { getRecipientPreferences } from "~/actions/recipient-preferences";
import { updateRecipientPreferences } from "~/actions/update-recipient-preferences";

const usePreferencesActions = () => {
  const { dispatch, graphQLClient } = useCourier();

  return {
    fetchRecipientPreferences: () => {
      dispatch({
        type: "preferences/FETCH_RECIPIENT_PREFERENCES",
        payload: () => getRecipientPreferences(graphQLClient),
      });
    },

    updateRecipientPreferences: async (payload) => {
      dispatch({
        type: "preferences/UPDATE_RECIPIENT_PREFERENCES",
        payload: () => updateRecipientPreferences(graphQLClient, payload),
      });
    },
  };
};

export default usePreferencesActions;
