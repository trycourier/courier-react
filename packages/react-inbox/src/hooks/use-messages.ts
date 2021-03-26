import {
  useCallback, useEffect, useState,
} from "react";
import { useQuery } from "urql";
import { useCourier } from "@trycourier/react-provider";
import useInbox from "./use-inbox";

export const GET_MESSAGES = `
  query ($after: String){
    unread: messages(params: { isRead: false }, after: $after) {
      totalCount
      pageInfo {
        startCursor
        hasNextPage
      }
      edges {
        node {
          id
          messageId
          created
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
  }
`;


const useMessages = () => {
  const [startCursor, setStartCursor] = useState(null);
  const [after, setAfter] = useState(null);
  const inbox = useInbox();

  const setLoading = useCallback(inbox.setLoading, []);
  const addMessages = useCallback(inbox.addMessages, []);
  const { transport } = useCourier();
  const [results] = useQuery({
    query: GET_MESSAGES,
    variables: {
      after,
    },
  });

  const fetchMore = useCallback(() => {
    if (startCursor) {
      setAfter(startCursor);
    }
  }, [startCursor]);

  useEffect(() => {
    setLoading(results?.fetching);
    const messages = results?.data?.unread?.edges;
    const startCursor = results?.data?.unread?.pageInfo?.startCursor;

    if (results?.data?.unread && !results?.fetching) {
      addMessages({ messages });
      setStartCursor(startCursor);
    }
  }, [results, setLoading, addMessages]);

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: (courierEvent) => {
        inbox.newMessage(courierEvent?.data);
      },
    });
  }, [transport]);
  return {
    messages: inbox.messages,
    isLoading: inbox.isLoading,
    fetchMore,
  };
};

export default useMessages;
