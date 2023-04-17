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
    actions(version: 2) {
      background_color
      data
      content
      href
      style
    }
    created
    data
    icon
    messageId
    opened
    pinned
    preview
    read
    icon
    tags
    title
    trackingIds {
      openTrackingId
      archiveTrackingId
      clickTrackingId
      deliverTrackingId
      readTrackingId
      unreadTrackingId
    }
  }
`;

export const createGetInboxMessagesQuery = (includePinned?: boolean) => `
  query GetInboxMessages($params: FilterParamsInput, ${
    includePinned ? "$pinnedParams: FilterParamsInput, " : ""
  } $limit: Int = 10, $after: String){
    ${
      includePinned
        ? `
      pinned: messages(params: $pinnedParams, limit: $limit, after: $after) {
        ${messagesProps}
      }
    `
        : ""
    }
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
      .query(createGetInboxMessagesQuery(!after), {
        after,
        limit,
        params: {
          ...restParams,
          pinned: false,
        },
        pinnedParams: {
          ...restParams,
          pinned: true,
        },
      })
      .toPromise();

    const messages = results?.data?.messages?.nodes;
    const pinned = results?.data?.pinned?.nodes;

    const startCursor = results?.data?.messages?.pageInfo?.startCursor;

    return {
      appendMessages: Boolean(after),
      messages,
      pinned,
      startCursor,
    };
  };
