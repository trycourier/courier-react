import { Client } from "urql";
import { IInboxMessagePreview } from "@trycourier/core";

export interface IGetInboxMessagesParams {
  tenantId?: string;
  archived?: boolean;
  from?: string | number;
  limit?: number;
  status?: "read" | "unread";
  tags?: string[];
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
    archived
    created
    data
    icon
    messageId
    opened
    pinned {
      slotId
    }
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

    const { limit, tenantId, ...restParams } = params ?? {};
    const results = await client
      .query(createGetInboxMessagesQuery(!after), {
        after,
        limit,
        params: {
          ...restParams,
          // [HACK] map tenantId to accountId in order to keep this backwards compatible
          accountId: tenantId,
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
