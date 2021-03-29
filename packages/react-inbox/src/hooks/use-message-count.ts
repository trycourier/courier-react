import { useEffect } from "react";
import { useQuery } from "urql";

import { useCourier } from "@trycourier/react-provider";
import useInbox from "./use-inbox";

export const GET_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean!) {
    messageCount(params: {
      isRead: $isRead
    })
  }
`;

const useMessageCount = () => {
  const inbox = useInbox();
  const { transport } = useCourier();

  const [results] = useQuery({
    query: GET_MESSAGE_COUNT,
    variables: {
      isRead: false,
    },
  });

  useEffect(() => {
    inbox.setHasUnreadMessages(results?.data?.messageCount);
  }, [results]);

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: () => {
        inbox.setHasUnreadMessages(results?.data?.messageCount + 1);
      },
    });
  }, [transport, results]);

  return results?.data?.messageCount;
};

export default useMessageCount;
