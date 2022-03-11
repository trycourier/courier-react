import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

export const GET_UNREAD_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean, $from: Float) {
    messageCount(params: {
      isRead: $isRead,
      from: $from
    })
  }
`;

export interface IMessageCountParams {
  isRead?: boolean;
  from?: number;
}
type GetUnreadMessageCount = (params?: IMessageCountParams) => Promise<number>;
export const getUnreadMessageCount = (
  client?: Client
): GetUnreadMessageCount => async (params) => {
  if (!client) {
    return Promise.resolve();
  }

  const results = await client
    .query(GET_UNREAD_MESSAGE_COUNT, {
      ...params,
      isRead: false,
    })
    .toPromise();
  return results?.data?.messageCount;
};

export interface IGetMessagesParams {
  after?: string;
  isRead?: boolean;
  from?: number;
}

export const QUERY_MESSAGES = `
  query GetMessages($after: String, $isRead: Boolean, $from: Float){
    messages(params: { 
        isRead: $isRead, 
        from: $from 
      }, after: $after) {
      totalCount
      pageInfo {
        startCursor
        hasNextPage
      }
      nodes {
        id
        messageId
        created
        read
        content {
          title
          body
          blocks {
            ... on TextBlock {
              type
              text
            }
            ... on ActionBlock {
              type
              text
              url
            }
          }
          data
          trackingIds {
            clickTrackingId
            deliverTrackingId
            readTrackingId
            unreadTrackingId
          }
        }
      }
    }
  }
`;

type GetMessages = (
  params?: IGetMessagesParams
) => Promise<{
  appendMessages: boolean;
  startCursor: string;
  messages: any[];
} | void>;

export const getMessages = (client?: Client): GetMessages => async (
  params?: IGetMessagesParams
) => {
  if (!client) {
    return Promise.resolve();
  }

  const results = await client.query(QUERY_MESSAGES, params).toPromise();

  const messages = results?.data?.messages?.nodes;
  const startCursor = results?.data?.messages?.pageInfo?.startCursor;

  return {
    appendMessages: Boolean(params?.after),
    messages,
    startCursor,
  };
};

export default (
  params: ICourierClientParams | { client: Client }
): {
  getUnreadMessageCount: GetUnreadMessageCount;
  getMessages: GetMessages;
} => {
  const client = createCourierClient(params);

  return {
    getUnreadMessageCount: getUnreadMessageCount(client),
    getMessages: getMessages(client),
  };
};
