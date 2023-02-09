import { Client } from "urql";

export interface IGetInboxMessagesParams {
  status?: "read" | "unread";
  limit?: number;
  tags?: string[];
  from?: string | number;
}

export const messagesProps = `
  totalCount
  pageInfo {
    startCursor
    hasNextPage
  }
  nodes {
    title
    preview
    messageId
    read
    created
    actions {
      background_color
      content
      href
      style
    }
    tags
    opened
    data
  }
`;

export const GET_INBOX_MESSAGES = `
  query GetInboxMessages($params: FilterParamsInput, $limit: Int = 10, $after: String){
    messages(params: $params, limit: $limit, after: $after) {
      ${messagesProps}
    }
  }
`;

export interface IInboxMessagePreview {
  created?: string;
  messageId: string;
  preview?: string;
  /** ISO 8601 date the message was read */
  read?: string;
  title?: string;
}

export type GetInboxMessages = (
  params?: IGetInboxMessagesParams,
  after?: string
) => Promise<
  | {
      appendMessages: boolean;
      startCursor: string;
      messages: IInboxMessagePreview[];
    }
  | undefined
>;

export const getInboxMessages =
  (client?: Client): GetInboxMessages =>
  async (params?: IGetInboxMessagesParams, after?: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const { limit, ...restParams } = params ?? {};
    const results = await client
      .query(GET_INBOX_MESSAGES, { after, limit, params: restParams })
      .toPromise();

    const messages = results?.data?.messages?.nodes;
    const startCursor = results?.data?.messages?.pageInfo?.startCursor;

    return {
      appendMessages: Boolean(after),
      messages,
      startCursor,
    };
  };
