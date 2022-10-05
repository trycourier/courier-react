import { Client } from "urql";

type EventType = "read" | "unread" | "archive";
export const getTrackEventQuery = (eventType: EventType) => `
  mutation TrackEvent(
    $messageId: String!
  ) {
    ${eventType}(messageId: $messageId)
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
  async (messageId: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const QUERY = getTrackEventQuery(eventType);
    const results = await client.mutation(QUERY, { messageId }).toPromise();
    const status = results?.data?.[eventType];

    return {
      [eventType]: status,
    };
  };
