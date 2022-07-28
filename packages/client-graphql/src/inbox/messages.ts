import { Client } from "urql";

export interface IGetInboxMessagesParams {
  status?: "read" | "unread";
  limit?: number;
  tags?: string[];
}

export const GET_INBOX_MESSAGES = `
  query GetInboxMessages($params: FilterParamsInput, $limit: Int = 10, $after: String){
    messages(params: $params, limit: $limit, after: $after) {
      totalCount
      pageInfo {
        startCursor
        hasNextPage
      }
      nodes {
        preview
        messageId
        read
        created
      }
    }
  }
`;

export interface IInboxMessagePreview {
  preview?: string;
  messageId: string;
  read?: string;
  created?: string;
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
