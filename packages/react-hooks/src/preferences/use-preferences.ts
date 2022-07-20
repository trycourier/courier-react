import { useCourier, registerReducer } from "@trycourier/react-provider";
import { useEffect } from "react";
import reducer from "./reducer";

import usePreferencesActions from "./use-preferences-actions";
import { PreferenceState } from "./types";

const usePreferences = () => {
  const { preferences } =
    useCourier<{
      preferences: PreferenceState;
    }>();

  const actions = usePreferencesActions();

  useEffect(() => {
    registerReducer("preferences", reducer);
  }, []);

  return { ...preferences, ...actions };
};

export default usePreferences;
