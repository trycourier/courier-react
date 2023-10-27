export type TrackLastActive = {
  type: "subg/TRACK_LAST_ACTIVE";
};

export const SUBG_TRACK_LAST_ACTIVE = "subg/TRACK_LAST_ACTIVE";

export const setLastActive = (): TrackLastActive => ({
  type: SUBG_TRACK_LAST_ACTIVE,
});

export type TrackLastActiveDone = {
  type: "subg/TRACK_LAST_ACTIVE/DONE";
  meta: {
    lastActive: string;
  };
  payload: {
    previousLastActive: string;
    sinceYouBeenGone: number;
  };
};

export type TrackLastActivePending = {
  type: "subg/TRACK_LAST_ACTIVE/PENDING";
};

export type TrackLastActiveError = {
  type: "subg/TRACK_LAST_ACTIVE/ERROR";
};
