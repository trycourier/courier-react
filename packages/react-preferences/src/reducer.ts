import { IPreferenceTemplate } from "./types";

interface PreferenceState {
  preferences?: IPreferenceTemplate[];
}

const initialState: PreferenceState = {
  preferences: undefined,
};

export default (state: PreferenceState = initialState, action) => {
  switch (action.type) {
    case "preferences/FETCH_RECIPIENT_PREFERENCES/PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "preferences/UPDATE_RECIPIENT_PREFERENCES/PENDING":
      return {
        ...state,
        isUpdating: true,
      };

    case "preferences/FETCH_RECIPIENT_PREFERENCES/DONE": {
      return {
        ...state,
        isLoading: false,
        recipientPreferences: action?.payload,
      };
    }

    case "preferences/UPDATE_RECIPIENT_PREFERENCES/DONE": {
      return {
        ...state,
        isUpdating: false,
        recipientPreferences: state.preferences?.map((preference) => {
          if (preference.templateId === action?.payload?.templateId) {
            return action?.payload;
          }

          return preference;
        }),
      };
    }
  }

  return state;
};
