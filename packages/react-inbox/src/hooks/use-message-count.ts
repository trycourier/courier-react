import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { useCourier } from "@trycourier/react-provider";

export const GET_MESSAGE_COUNT = `
  query MessageCount($isRead: Boolean!) {
    messageCount(params: {
      isRead: $isRead
    })
  }
`;

const useMessageCount = () => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { transport } = useCourier();

  const [results] = useQuery({
    query: GET_MESSAGE_COUNT,
    variables: {
      isRead: false,
    },
  });

  useEffect(() => {
    transport?.listen({
      id: "inbox-listener",
      listener: () => {
        setUnreadMessageCount(results?.data?.messageCount + 1);
      },
    });
  }, [transport, results]);

  return unreadMessageCount;
};

export default useMessageCount;
