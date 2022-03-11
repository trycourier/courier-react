import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

const TRACK_EVENT = `
  mutation TrackEvent($trackingId: String!) {
    trackEvent(trackingId: $trackingId) {
      id
    }
  }
`;
export type TrackEvent = (trackingId: string) => Promise<void>;
export const trackEvent = (client: Client): TrackEvent => async (
  trackingId
) => {
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
export type TrackEventBatch = (eventType: string) => Promise<void>;
export const trackEventBatch = (client: Client): TrackEventBatch => async (
  eventType
) => {
  await client
    .mutation(TRACK_EVENT_BATCH, {
      eventType,
    })
    .toPromise();
};

export default (
  params: ICourierClientParams
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
