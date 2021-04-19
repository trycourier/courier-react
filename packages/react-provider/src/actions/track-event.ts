const UPDATE_TRACK_EVENT = `
  mutation TrackEvent($trackingId: String!) {
    trackEvent(trackingId: $trackingId) {
      id
    }
  }
`;

const UPDATE_TRACK_EVENT_BATCH = `
  mutation BatchTrackEvent($eventType: String!, $messageIds: [String]!) {
    batchTrackEvent(eventType: $eventType, messageIds: $messageIds) {
      ids
    }
  }
`;

export const updateTrackEvent = async (client, trackingId) => {
  await client.mutate(UPDATE_TRACK_EVENT, {
    trackingId,
  });
};

export const updateTrackEventBatch = async (client, messageIds, eventType) => {
  await client.mutate(UPDATE_TRACK_EVENT_BATCH, {
    messageIds,
    eventType,
  });
};
