import { Client } from "urql";
import { IActionElemental } from "./message";

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
    actions {
      background_color
      content
      href
      style
    }
    created
    data
    messageId
    opened
    preview
    read
    tags
    title
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
  actions?: IActionElemental[];
  created: string;
  data?: Record<string, any>;
  messageId: string;
  opened?: string;
  preview?: string;
  read?: string;
  tags?: string[];
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
