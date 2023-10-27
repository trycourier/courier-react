import { Client } from "urql";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "./types";
import { createCourierClient } from "./client";

const TRACK_LAST_ACTIVE = `
  mutation TrackLastActive($lastActive: String!) {
    trackLastActive(lastActive: $lastActive) {
      previousLastActive
      sinceYouBeenGone
    }
  }
`;
export type TrackLastActive = (lastActive: string) => Promise<void>;
export const trackLastActive =
  (client?: Client): TrackLastActive =>
  async (lastActive: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const response = await client
      .mutation(TRACK_LAST_ACTIVE, {
        lastActive,
      })
      .toPromise();

    return response?.data?.trackLastActive ?? {};
  };

export default (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  trackLastActive: TrackLastActive;
} => {
  const client = createCourierClient(params);

  return {
    trackLastActive: trackLastActive(client),
  };
};
