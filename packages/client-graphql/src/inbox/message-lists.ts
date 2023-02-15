import {
  IGetInboxMessagesParams,
  IInboxMessagePreview,
  messagesProps,
} from "./messages";
import { Client } from "urql";

export type GetInboxMessageLists = (
  lists?: {
    id: string;
    filters: IGetInboxMessagesParams;
  }[],
  limit?: number
) => Promise<
  | {
      [listName: string]: {
        startCursor: string;
        messages: IInboxMessagePreview[];
      };
    }
  | undefined
>;

export const getMessageLists =
  (client?: Client): GetInboxMessageLists =>
  async (lists, limit = 10) => {
    if (!client || !lists) {
      return Promise.resolve(undefined);
    }

    console.log("lists", lists);

    const initialReduction: {
      args: string[];
      queries: string[];
      variables: {
        [key: string]: IGetInboxMessagesParams;
      };
    } = {
      args: [],
      queries: [],
      variables: {},
    };

    const { args, queries, variables } = lists.reduce((acc, cur) => {
      acc.args.push(`$${cur.id}Params: FilterParamsInput`);
      acc.queries.push(
        `${cur.id}: messages(params: $${cur.id}Params, limit: $limit) { ${messagesProps} } `
      );
      acc.variables[`${cur.id}Params`] = cur.filters;
      return acc;
    }, initialReduction);

    const QUERY = `query GetMessageLists(${args}, $limit: Int = 10){
      ${queries.join("")}
    }`;

    console.log("QUERY", QUERY);
    console.log({ ...variables, limit });
    const results = await client
      .query(QUERY, { ...variables, limit })
      .toPromise();

    console.log("results", results);
    const response = Object.keys(results.data)?.reduce((acc, listName) => {
      acc[listName] = {
        messages: results.data[listName].nodes,
        startCursor: results.data[listName].pageInfo?.startCursor,
      };
      return acc;
    }, {});

    return response;
  };
