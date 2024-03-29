import { Client } from "urql";
import { ICourierClientBasicParams, ICourierClientJWTParams } from "./types";
import { createCourierClient } from "./client";

const TRACK_EVENT = `
  mutation TrackEvent($trackingId: String!) {
    trackEvent(trackingId: $trackingId) {
      id
    }
  }
`;
export type TrackEvent = (trackingId: string) => Promise<void>;
export const trackEvent =
  (client?: Client): TrackEvent =>
  async (trackingId) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    await client
      .mutation(TRACK_EVENT, {
        trackingId,
      })
      .toPromise();
  };

const TRACK_EVENT_BATCH = `
  mutation BatchTrackEvent($eventType: String!) {
    batchTrackEvent(eventType: $eventType) {
      ids
    }
  }
`;
export type TrackEventBatch = (eventType: string) => Promise<string[]>;
export const trackEventBatch =
  (client?: Client): TrackEventBatch =>
  async (eventType) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const response = await client
      .mutation(TRACK_EVENT_BATCH, {
        eventType,
      })
      .toPromise();

    return response?.data?.batchTrackEvent?.ids ?? [];
  };

export default (
  params:
    | ICourierClientBasicParams
    | ICourierClientJWTParams
    | { client?: Client }
): {
  trackEvent: TrackEvent;
  trackEventBatch: TrackEventBatch;
} => {
  const client = createCourierClient(params);

  return {
    trackEvent: trackEvent(client),
    trackEventBatch: trackEventBatch(client),
  };
};
