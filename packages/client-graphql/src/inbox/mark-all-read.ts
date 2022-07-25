import { Client } from "urql";

export const MARK_ALL_READ = `
  mutation TrackEvent {
    markAllRead
  } 
`;

export type MarkAllRead = () => Promise<
  | {
      markAllRead: boolean;
    }
  | undefined
>;

export const markAllRead =
  (client?: Client): MarkAllRead =>
  async () => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const results = await client.query(MARK_ALL_READ).toPromise();
    const markAllRead = results?.data?.markAllRead;

    return {
      markAllRead,
    };
  };
