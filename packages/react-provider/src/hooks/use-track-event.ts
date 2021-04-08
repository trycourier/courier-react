import { useMutation } from "urql";

const TRACK_EVENT = `
  mutation TrackEvent($trackingId: String!) {
    trackEvent(trackingId: $trackingId) {
      id
    }
  }
`;

const BATCH_TRACK_EVENT = `
  mutation BatchTrackEvent($eventType: String!, $messageIds: [String]!) {
    batchTrackEvent(eventType: $eventType, messageIds: $messageIds) {
      ids
    }
  }
`;

const useTrackEvent = () => {
  const [, trackEvent] = useMutation(TRACK_EVENT);
  const [, batchTrackEvent] = useMutation(BATCH_TRACK_EVENT);
  return { trackEvent, batchTrackEvent };
};

export default useTrackEvent;
