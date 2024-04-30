import { Client } from "urql";
import { IGetInboxMessagesParams } from "./messages";

export const MARK_ALL_READ = `
  mutation TrackEvent($params: MarkAllAsReadParamsInput) {
    markAllRead(params: $params)
  } 
`;

export type MarkAllRead = (params?: IGetInboxMessagesParams) => Promise<
  | {
      markAllRead: boolean;
    }
  | undefined
>;

export const markAllRead =
  (client?: Client): MarkAllRead =>
  async (params: IGetInboxMessagesParams = {}) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const results = await client
      .mutation(MARK_ALL_READ, { params })
      .toPromise();
    const markAllRead = results?.data?.markAllRead;

    return {
      markAllRead,
    };
  };
