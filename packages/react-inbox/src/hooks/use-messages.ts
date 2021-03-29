import {
   useEffect, useState,
} from "react";
import { useClient } from "urql";
import { useCourier } from "@trycourier/react-provider";

export const GET_MESSAGES = `
  query ($after: String, $isRead: Boolean){
    messages(params: { isRead: $isRead }, after: $after) {
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
        content {
          title
          body
          data
          trackingIds {
            clickTrackingId
            readTrackingId
            deliverTrackingId
          }
        }
      }
    }
  }
`;


const useMessages = () => {
  const client = useClient();
  
  const { transport } = useCourier();

  const fetch =  async (variables) => {
    const results = await client.query(GET_MESSAGES, variables).toPromise();

    const messages = results?.data?.messages?.nodes;
    const startCursor = results?.data?.messages?.pageInfo?.startCursor;
  
    return {
      appendMessages: Boolean(variables?.after),
      messages,
      startCursor,
    };
  }

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        //inbox.newMessage(courierEvent?.data);
      },
    });
  }, [transport]);
  
  return {
    fetch,
  };
};

export default useMessages;
