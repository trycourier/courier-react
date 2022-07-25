import { Client } from "urql";

export const GET_INBOX_MESSAGE = `
  query GetInboxMessage($messageId: String!){
    message(messageId: $messageId) {
      created
      messageId
      content {
        elemental {
          ... on TextElement {
            type
            content
          }
          ... on ActionElement {
            type
            content
            href
          }
        }
      }
    }
  }
`;

export type GetInboxMessage = (messageId: string) => Promise<
  | {
      message: any;
    }
  | undefined
>;

export const getInboxMessage =
  (client?: Client): GetInboxMessage =>
  async (messageId?: string) => {
    if (!client) {
      return Promise.resolve(undefined);
    }

    const results = await client
      .query(GET_INBOX_MESSAGE, { messageId })
      .toPromise();

    const message = results?.data?.message;

    return {
      message,
    };
  };
