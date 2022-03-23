import { Client } from "urql";
import { ICourierClientParams } from "../types";
import { createCourierClient } from "../client";

export const GET_UNREAD_MESSAGE_COUNT = `
  query MessageCount($params: FilterParamsInput) {
    messageCount(params: $params)
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
      params: {
        ...params,
        isRead: false,
      },
    })
    .toPromise();
  return results?.data?.messageCount;
};

export interface IGetMessagesParams {
  isRead?: boolean;
  from?: number;
  tags?: string[];
}

export const QUERY_MESSAGES = `
  query GetMessages($params: FilterParamsInput, $limit: Int = 10, $after: String){
    messages(params: $params, limit: $limit, after: $after) {
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
  params?: IGetMessagesParams,
  after?: string
) => Promise<{
  appendMessages: boolean;
  startCursor: string;
  messages: any[];
} | void>;

export const getMessages = (client?: Client): GetMessages => async (
  params?: IGetMessagesParams,
  after?: string
) => {
  if (!client) {
    return Promise.resolve();
  }

  const results = await client
    .query(QUERY_MESSAGES, { after, params })
    .toPromise();

  const messages = results?.data?.messages?.nodes;
  const startCursor = results?.data?.messages?.pageInfo?.startCursor;

  return {
    appendMessages: Boolean(after),
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
