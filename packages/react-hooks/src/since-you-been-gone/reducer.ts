import {
  TrackLastActive,
  TrackLastActiveDone,
  TrackLastActiveError,
  TrackLastActivePending,
} from "./actions/track-last-active";
import { SinceYouBeenGoneState } from "./types";

const initialState: SinceYouBeenGoneState = {
  currentLastActive: undefined,
  previousLastActive: undefined,
  sinceYouBeenGone: undefined,
};

type SUBGAction =
  | TrackLastActive
  | TrackLastActiveDone
  | TrackLastActivePending
  | TrackLastActiveError;

export default (
  state: SinceYouBeenGoneState = initialState,
  action: SUBGAction
): SinceYouBeenGoneState => {
  switch (action.type) {
    case "subg/TRACK_LAST_ACTIVE/DONE":
      return {
        ...state,
        currentLastActive: action?.meta?.lastActive,
        previousLastActive: action?.payload?.previousLastActive,
        sinceYouBeenGone: action?.payload?.sinceYouBeenGone,
      };
  }

  return state;
};
