import { Client } from "urql";
import { ICourierClientBasicParams } from "./types";
import { createCourierClient } from "./client";

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
export const getMessageCount =
  (client?: Client): GetMessageCount =>
  async (params) => {
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
  from?: number;
  isRead?: boolean;
  limit?: number;
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
            archiveTrackingId
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

interface ITextBlock {
  type: "text";
  text: string;
}

interface IActionBlock {
  type: "action";
  text: string;
  url: string;
}
export interface IGraphMessageResponse {
  id: string;
  messageId: string;
  created: number;
  read?: number;
  tags?: string[];
  content: {
    title: string;
    body: string;
    blocks: Array<ITextBlock | IActionBlock>;
    data?: any;
    trackingIds: {
      archiveTrackingId: string;
      clickTrackingId: string;
      deliverTrackingId: string;
      readTrackingId: string;
      unreadTrackingId: string;
    };
  };
}

type GetMessages = (
  params?: IGetMessagesParams,
  after?: string
) => Promise<
  | {
      appendMessages: boolean;
      startCursor: string;
      messages: IGraphMessageResponse[];
    }
  | undefined
>;

export const getMessages =
  (client?: Client): GetMessages =>
  async (params?: IGetMessagesParams, after?: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const { limit, ...restParams } = params ?? {};
    const results = await client
      .query(QUERY_MESSAGES, { after, limit, params: restParams })
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
  params: ICourierClientBasicParams | { client?: Client }
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
