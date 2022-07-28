import { Client } from "urql";

export const GET_INBOX_MESSAGE = `
  query GetInboxMessage($messageId: String!){
    message(messageId: $messageId) {
      created
      messageId
      read
      content {
        html
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

export interface ITextElemental {
  type: "text";
  content: string;
}
export interface IActionElemental {
  type: "text";
  content: string;
  href: string;
}
export interface IInboxMessage {
  messageId: string;
  read?: string;
  created?: string;
  content: {
    html?: string;
    elemental?: Array<ITextElemental | IActionElemental>;
  };
}

export type GetInboxMessage = (messageId: string) => Promise<
  | {
      message: IInboxMessage;
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
