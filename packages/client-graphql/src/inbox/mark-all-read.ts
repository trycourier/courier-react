import { Client } from "urql";

export const MARK_ALL_READ = `
  mutation TrackEvent($params: MarkAllAsReadParamsInput) {
    markAllRead(params: $params)
  } 
`;

export interface IMarkAllAsReadParams {
  tags?: string[];
}

export type MarkAllRead = (params?: IMarkAllAsReadParams) => Promise<
  | {
      markAllRead: boolean;
    }
  | undefined
>;

export const markAllRead =
  (client?: Client): MarkAllRead =>
  async (params: IMarkAllAsReadParams = {}) => {
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
