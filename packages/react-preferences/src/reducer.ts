import { IPreferenceTemplate } from "./types";

interface PreferenceState {
  preferences?: IPreferenceTemplate[];
}

const initialState: PreferenceState = {
  preferences: undefined,
};

export default (state: PreferenceState = initialState, action) => {
  switch (action.type) {
    case "preferences/UPDATE_RECIPIENT_PREFERENCES/PENDING":
    case "preferences/FETCH_PREFERENCES/PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "preferences/FETCH_PREFERENCES/DONE": {
      const preferences = action?.payload;

      return {
        ...state,
        isLoading: false,
        preferences,
      };
    }

    case "preferences/UPDATE_RECIPIENT_PREFERENCES/DONE": {
      return {
        ...state,
        isLoading: false,
        preferences: state.preferences?.map((preference) => {
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
