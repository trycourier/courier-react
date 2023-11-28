import { useCourier, registerReducer } from "@trycourier/react-provider";
import { useEffect } from "react";
import reducer from "./reducer";

import usePreferencesActions, {
  UsePreferenceActions,
} from "./use-preferences-actions";
import { PreferenceState } from "./types";

export type UsePreferences = PreferenceState & UsePreferenceActions;

const usePreferences = (): UsePreferences => {
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
