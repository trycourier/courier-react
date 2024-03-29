import { Client } from "urql";

type EventType =
  | "addTag"
  | "archive"
  | "clicked"
  | "opened"
  | "read"
  | "removeTag"
  | "unpin"
  | "unread";

export const getTrackEventQuery = (eventType: EventType) => `
  mutation TrackEvent(
    $messageId: String!
  ) {
    ${eventType}(messageId: $messageId)
  }
`;

export const getTagMutation = (eventType: EventType) => `
  mutation TrackEvent(
    $messageId: String!
    $tag: String!
  ) {
    ${eventType}(messageId: $messageId, tag: $tag)
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
  async (messageId: string, data?: Record<string, unknown>) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const params = (() => {
      switch (eventType) {
        case "clicked": {
          return {
            mutation: getTrackEventQueryWithTrackingId(eventType),
            variables: {
              messageId,
              trackingId: data?.trackingId,
            },
          };
        }

        case "addTag":
        case "removeTag": {
          return {
            mutation: getTagMutation(eventType),
            variables: {
              messageId,
              tag: data?.tag,
            },
          };
        }

        default: {
          return {
            mutation: getTrackEventQuery(eventType),
            variables: {
              messageId,
            },
          };
        }
      }
    })();

    const results = await client
      .mutation(params.mutation, params.variables)
      .toPromise();
    const status = results?.data?.[eventType];

    return {
      [eventType]: status,
    };
  };
