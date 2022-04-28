import { Client } from "urql";
import { ICourierClientBasicParams } from "../types";
import { createCourierClient } from "../client";

export const GET_MESSAGE_COUNT = `
  query MessageCount($params: FilterParamsInput) {
    messageCount(params: $params)
  }
`;

export interface IMessageCountParams {
  tags?: string[];
  from?: number;
  isRead?: boolean;
}
type GetMessageCount = (params?: IMessageCountParams) => Promise<number>;
export const getMessageCount = (client?: Client): GetMessageCount => async (
  params
) => {
  if (!client) {
    return Promise.resolve();
  }

  const results = await client
    .query(GET_MESSAGE_COUNT, {
      params,
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
        tags
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
) => Promise<
  | {
      appendMessages: boolean;
      startCursor: string;
      messages: any[];
    }
  | undefined
>;

export const getMessages = (client?: Client): GetMessages => async (
  params?: IGetMessagesParams,
  after?: string
) => {
  if (!client) {
    return Promise.resolve(undefined);
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
  params: ICourierClientBasicParams | { client: Client }
): {
  getMessageCount: GetMessageCount;
  getMessages: GetMessages;
} => {
  const client = createCourierClient(params);

  return {
    getMessageCount: getMessageCount(client),
    getMessages: getMessages(client),
  };
};
