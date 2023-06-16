import { Client } from "urql";

type EventType = "read" | "unread" | "archive" | "opened" | "clicked" | "unpin";
export const getTrackEventQuery = (eventType: EventType) => `
  mutation TrackEvent(
    $messageId: String!
  ) {
    ${eventType}(messageId: $messageId)
  }
`;

export const getTrackEventQueryWithTrackingId = (eventType: EventType) => `
  mutation TrackEvent(
    $messageId: String!
    $trackingId: String!
  ) {
    ${eventType}(messageId: $messageId, trackingId: $trackingId)
  }
`;

export type TrackEvent = (messageId: string) => Promise<
  | {
      [eventType: string]: boolean;
    }
  | undefined
>;

export const trackEvent =
  (client?: Client) =>
  (eventType: EventType): TrackEvent =>
  async (messageId: string, trackingId?: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const QUERY =
      eventType === "clicked"
        ? getTrackEventQueryWithTrackingId(eventType)
        : getTrackEventQuery(eventType);

    const results = await client
      .mutation(QUERY, { messageId, trackingId })
      .toPromise();
    const status = results?.data?.[eventType];

    return {
      [eventType]: status,
    };
  };
